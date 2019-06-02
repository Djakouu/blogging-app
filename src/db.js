let users = [{
    id: '1',
    name: 'Djakou',
    email: 'j@k.fr',
    age: 27,
}, {
    id: '2',
    name: 'Olga',
    email: 'j@k.com',
    age: 25,
}, {
    id: '3',
    name: 'Grace',
    email: 'j@k.org',
}]

let posts = [{
    id: '11',
    title: 'Djakou the Great',
    body: 'j@k.fr',
    isPublished: true,
    author: '1'
}, {
    id: '12',
    title: 'Olga the Beauty',
    body: 'j@k.com',
    isPublished: false,
    author: '3'
}, {
    id: '13',
    title: 'Grace the Wise',
    body: 'jk.org',
    isPublished: true,
    author: '3'
}]

let comments = [{
    id: '21',
    text: 'Djakou is Great',
    post: '11',
    commentator: '3'
}, {
    id: '22',
    text: 'Olga is Beauty',
    post: '12',
    commentator: '1'
}, {
    id: '23',
    text: 'Grace is Wise',
    post: '13',
    commentator: '1'
}, {
    id: '24',
    text: 'All winners',
    post: '13',
    commentator: '2'
}]

const db = {
    users,
    posts,
    comments
}

export default db