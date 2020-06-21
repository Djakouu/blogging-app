import { gql } from 'apollo-boost'

const createUser = gql`
    mutation($data:CreateUserInput!) {
        createUser(
            data: $data
        ){
            token,
            user {
                id
            }
        }
    }
`
const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`

const login = gql`  
    mutation($data:LoginUserInput!) {
        login(
            data: $data
        ) {
            token
        }
    }
`

const getProfile = gql`
    query {
        me {
            id
            name
            email
        }
    }
`

const getPosts = gql`
    query {
        posts {
            id
            title
            isPublished
        }
    }
`

const getMyPosts = gql`
    query {
        myPosts {
            id
            title
            body
            isPublished
        }
    }
`

const updatePost = gql`
    mutation($id: ID! $data: UpdatePostInput!) {
        updatePost(
            id: $id,
            data: $data
        ) {
            id
            title
            body
            isPublished
        }
    }
`

const createPost = gql`
    mutation($data: CreatePostInput!) {
        createPost(
            data: $data
        ) {
            id
            title
            body
            isPublished
        }
    }
`

const deletePost = gql`
    mutation($id: ID!) {
        deletePost(
            id: $id
        ) {
            id
            title
            body
            isPublished
        }
    }
`

const deleteComment = gql`
    mutation($id: ID!) {
        deleteComment(
            id: $id
        ) {
            id
            text
        }
    }
`
const subscribeToComments = gql`
    subscription($postId: ID!) {
        comment(postId: $postId) {
            mutation
            node {
                id
            }
        }
    }
`

const subscribeToPosts = gql`
    subscription($userId: ID!) {
        post(userId: $userId) {
            mutation
            node {
                id
            }
        }
    }
`

export { 
    createUser, 
    login,
    getUsers,
    getProfile,
    getPosts,
    getMyPosts,
    updatePost,
    createPost,
    deletePost,
    deleteComment,
    subscribeToComments,
    subscribeToPosts
}