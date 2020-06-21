import prisma from '../../src/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const user1 = {
    input: {
        name: 'Olga',
        email: 'olga@live.fr',
        password: bcrypt.hashSync('red12345')
    },
    user: undefined,
    jwt: undefined
}

const user2 = {
    input: {
        name: 'Kim',
        email: 'kim@live.fr',
        password: bcrypt.hashSync('red12345')
    },
    user: undefined,
    jwt: undefined
}

const post1 = {
    input: {
        title: 'Post 1',
        body: '',
        isPublished: true
    },
    post: undefined
}

const post2 = {
    input: {
        title: 'Post 2',
        body: '',
        isPublished: false
    },
    post: undefined
}

const comment1 = {
    input: {
        text: 'Great post'
    },
    comment: undefined
}

const comment2 = {
    input: {
        text: 'Bad post'
    },
    comment: undefined
}

const seedDB = async () => {
    // Delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // Create users
    user1.user = await prisma.mutation.createUser({
        data: user1.input
    })
    user1.jwt = jwt.sign({ userId: user1.user.id }, process.env.JWT_SECRET)

    user2.user = await prisma.mutation.createUser({
        data: user2.input
    })
    user2.jwt = jwt.sign({ userId: user2.user.id }, process.env.JWT_SECRET)

    // Create posts
    post1.post = await prisma.mutation.createPost({
        data: {
            ...post1.input,
            author: {
                connect: {
                    id: user1.user.id
                }
            }
        }
    })

    post2.post = await prisma.mutation.createPost({
        data: {
            ...post2.input,
            author: {
                connect: {
                    id: user1.user.id
                }
            }
        }
    })

    // Create comments
    comment1.comment = await prisma.mutation.createComment({
        data: {
            ...comment1.input,
            author: {
                connect: {
                    id: user1.user.id
                }
            },
            post: {
                connect: {
                    id: post1.post.id
                }
            }
        }
    })

    comment2.comment = await prisma.mutation.createComment({
        data: {
            ...comment2.input,
            author: {
                connect: {
                    id: user2.user.id
                }
            },
            post: {
                connect: {
                    id: post1.post.id
                }
            }
        }
    })
}

export { seedDB as default, user1, post1, post2 }
