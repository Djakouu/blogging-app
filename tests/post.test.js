// import 'cross-fetch/polyfill'
// import { gql } from 'apollo-boost'
// import prisma from '../src/prisma'
// import seedDB, { user1, post1, post2 } from './utils/seedDB'
// import getClient from './utils/getClient'
import { getPosts, getMyPosts, updatePost, createPost, deletePost } from './utils/operations'


// const client = getClient()

// beforeEach(seedDB)

test('Sould expose published posts', async () => {
//     const res = await client.query({ query: getPosts })
//         expect(res.data.posts.length).toBe(1)
//         expect(res.data.posts[0].isPublished).toBe(true)
})

// test('Should fetch user posts', async () => {
//     const client = getClient(user1.jwt)
    
//     const { data } = await client.query({ query: getMyPosts })
//     expect(data.myPosts.length).toBe(2)
//     expect(data.myPosts[0].id).toBe(user1.user.posts[0].id)
//     expect(data.myPosts[0].title).toBe(user1.user.posts[0].title)
//     expect(data.myPosts[0].isPublished).toBe(true)
//     expect(data.myPosts[1].id).toBe(user1.user.posts[1].id)
//     expect(data.myPosts[1].title).toBe(user1.user.posts[1].title)
//     expect(data.myPosts[1].isPublished).toBe(false)
// })

// test('Sould be able to update own posts', async () => {
//     const client = getClient(user1.jwt)
//     const variables = {
//         id: post1.post.id,
//         data: {
//             isPublished: false
//         }
//     }

//     const { data } = await client.mutate({ mutation: updatePost, variables })
//     const exists = await prisma.exists.Post({ id:post1.id, isPublished: false})
//     expect(data.updatePost.isPublished).toBe(false)
//     expect(exists).toBe(true)
// })

// test('Sould be able to create post', async () => {
//     const client = getClient(user1.jwt)
//     const variables = {
//         data: {
//             title: "test 1",
//             body: "This is test 1",
//             isPublished: true
//         }
//     }
    
//     const { data } = await client.mutate({ mutation: createPost, variables })
//     const exists = await prisma.exists.Post({ id:data.createPost.id })
//     expect(data.createPost.isPublished).toBe(true)
//     expect(exists).toBe(true)
// })

// test('Sould be able to delete post2 in seedDB', async () => {
//     const client = getClient(user1.jwt)
//     const variables = {
//         id: post2.post.id
//     }
//     await client.mutate({ mutation: deletePost, variables })
//     const exists = await prisma.exists.Post({ id:post2.post.id })
//     expect(exists).toBe(false)
// })