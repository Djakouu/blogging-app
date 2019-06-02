import getUserid from '../utils/getUserId'

const Subscription = {
    comment: {
        subscribe(parent, { postId }, { prisma }, info) {
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info)    
        }
    },

    post: {
        subscribe(parent, { userId }, { prisma }, info) {
            return prisma.subscription.post({
                where: {
                    node: {
                        isPublished: true,
                    }
                }
            }, info)
        }
    },
    myPost: {
        subscribe(parent, args, { prisma, request }, info) {
            const userId = getUserid(request)
            return prisma.subscription.post({
                where: {
                    node: {
                        author: {
                            id: userId
                        }
                    }
                }
            }, info)
        }
    }
}

export default Subscription