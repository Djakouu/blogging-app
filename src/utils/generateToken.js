import jwt from 'jsonwebtoken'

const generateToken = (userId) => jwt.sign({ userId }, 'secret', { expiresIn: '7d'})

export { generateToken as default}