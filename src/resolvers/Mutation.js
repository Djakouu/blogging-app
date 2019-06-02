import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },

    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({ where: { email: args.data.email }})
        if (!user) 
            throw new Error('This email does not exist')
        
        const passwordMatch = await bcrypt.compare(args.data.password, user.password)
        if (!passwordMatch) 
            throw new Error('Incorrect password')

        return {
            user,
            token: generateToken(user.id)
        }
    },

    deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.deleteUser({ where: { id: userId } }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        
        if (args.data.password) {
            const password = await hashPassword(args.data.password)
        
            return prisma.mutation.updateUser({
                where: {
                    id: userId
                },
                data: {
                    ...args.data,
                    password
                }
            })
        }
        else    
            return prisma.mutation.updateUser({
                where: {
                    id: userId
                },
                data: args.data
            }, 
            info)
    },

    createPost(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)
        
        return prisma.mutation.createPost({ 
            data: {
                title: data.title,
                body: data.body,
                isPublished: data.isPublished,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists)
            throw new Error('Unable to delete post')
        
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists)
            throw new Error('Unable to update post')
        
        const postPublished = await prisma.exists.Post({
            id: args.id,
            isPublished: true
        })

        if (postPublished && args.data.isPublished === false)
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            })

        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },

    async createComment(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({ id: data.post, isPublished: true })

        if(!postExists) 
            throw new Error('This post does not exist')

        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
                }
        }, info)
    },
    async deleteComment(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId
            }
        })

        if (!commentExists)
            throw new Error('Unable to delete comment')
        
        return prisma.mutation.deleteComment({
            where: {
                id
            }
        }, info)
    },
    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists)
            throw new Error('Unable to update comment')
        
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    }
}

export default Mutation