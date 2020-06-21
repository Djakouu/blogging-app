import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import seedDB, { user1 } from './utils/seedDB'
import prisma from '../src/prisma'
import getClient from './utils/getClient'
import { createUser, login, getProfile, getUsers } from './utils/operations'

const client = getClient()

beforeEach(seedDB)


test('Should create a new user', async () => {
    const variables = {
        data: {
            name: 'kjbfhsg',
            email: 'kjbfhsg@live.fr',
            password: 'red12345'
        }
    }

    const res = await client.mutate({
        mutation: createUser,
        variables
    })

    // const exists = await prisma.exists.User({ id: res.data.createUser.user.id })
    // expect(exists).toBe(true)
})

// test('Sould expose public author profiles', async () => {
    
//     const res = await client.query({ query: getUsers })
//         expect(res.data.users.length).toBe(1)
//         expect(res.data.users[0].email).toBe(null)
//         expect(res.data.users[0].name).toBe('Olga')
// })


// test('Should not login with bad credentials', async () => {
//     const variables = {
//         data: {
//             email: 'Olga@live.fr',
//             password: 'wrongpassword'
//         }
//     }
    
//     await expect(
//         client.mutate({ mutation: login, variables })
//     ).rejects.toThrow()
// })

// // test('Should login with good credentials', async () => {
// //     const variables = {
// //         data: {
// //             email: "olga@live.fr",
// //             password: "red12345"
// //         }
// //     }
    
// //     await expect(
// //         client.mutate({ mutation: login, variables })
// //     ).rejects.not.toThrow()
// // })

// test('Should not sign up with short password', async () => {
//     const variables = {
//         data: {
//             name: "Kim",
//             email: "kim@live.fr",
//             password: 'red'
//         }
//     }
    
//     await expect(
//         client.mutate({ mutation: createUser, variables })
//     ).rejects.toThrow()
// })

// test('Should fecth user profile', async () => {
//     const client = getClient(user1.jwt)
    
//     const { data } = await client.query({ query: getProfile })
//     expect(data.me.id).toBe(user1.user.id)
//     expect(data.me.name).toBe(user1.user.name)
//     expect(data.me.email).toBe(user1.user.email)
// })