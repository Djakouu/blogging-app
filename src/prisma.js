import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
})

export { prisma as default} 
// prisma.query.users(null, '{ id name posts { id body } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { name email } post { title author { name } } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// const creatPostForUser = async (userID, data) => {
//     const userExists = await prisma.exists.User({ id: userID })
    
//     if(!userExists)
//         throw new Error('This user does not exist')

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//             connect: {
//                 id: userID
//             }
//         }
//         }
//     }, `{ author { id name email posts { id title isPublished}} }`)

//     return post.author
// }

// // creatPostForUser('cjvnjxyvi00260707omixvpk5', {
// //     title: 'Gastby 2',
// //     body: 'Gat is great',
// //     isPublished: false
// // }).then((user) => {
// //     console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //     console.log(error.message)
// // })

// const updatePostForUser = async (postID, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postID
//     })

//     if (!postExists)
//         throw new Error('This post does not exist (anymore)')

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postID
//         },
//         data: {
//             ...data
//         }
//     }, `{ author { id name email posts { id title isPublished}} }`)

//     return post.author
// }

// updatePostForUser('cjvp2ucci001u0707j14rh1v', {
//     title: 'Prisma',
//     body: 'Pri is great',
//     isPublished: false
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })



