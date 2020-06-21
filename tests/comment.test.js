import 'cross-fetch/polyfill'
import getClient from './utils/getClient'
import seedDB, { user1, post1, comment1, comment2 } from './utils/seedDB'
import { deleteComment, subscribeToComments, subscribeToPosts } from './utils/operations'
import prisma from '../src/prisma'

beforeEach(seedDB)

test('Shloud delete owned comment', async () => {
    const client = getClient(user1.jwt)
    const variables = {
        id: comment1.comment.id
    }

    await client.mutate({ mutation: deleteComment, variables})
    const exists = await prisma.exists.Comment({ id:comment1.comment.id })
    expect(exists).toBe(false)
})

test('Shloud not delete none owned comment', async () => {
    const client = getClient(user1.jwt)
    const variables = {
        id: comment2.comment.id
    }

    await expect(
        client.mutate({ mutation: deleteComment, variables})
        ).rejects.toThrow()

    const exists = await prisma.exists.Comment({ id:comment2.comment.id })
    expect(exists).toBe(true)
})

test('Should subscribe to comments for a post', async (done) => {
    const variables = {
        postId: post1.post.id
    }

    client.subscribe({ query: subscribeToComments, variables}).subscribe({
        next(res) {
            // Assertions
            expect(res.data.comment.mutation).toBe('DELETED')
            done()
        }
    })

    // Change a comment
    await prisma.mutation.deleteComment({ where: { id: comment1.comment.id }})
})

test('Should subscribe to posts for a user', async (done) => {
    const variables = {
        userId: user1.user.id
    }

    client.subscribe({ query: subscribeToPosts, variables}).subscribe({
        next(res) {
            // Assertions
            expect(res.data.post.mutation).toBe('DELETED')
            done()
        }
    })

    // Change a post
    await prisma.mutation.deletePost({ where: { id: post1.post.id }})
})