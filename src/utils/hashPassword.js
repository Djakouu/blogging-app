import bcrypt from 'bcryptjs'

const hashPassword = (pw) => {
    if (pw.length < 8)
        throw new Error('Password must be 8 characters or longer')
    
    return bcrypt.hash(pw, 10)
}

export { hashPassword as default }