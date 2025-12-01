import jwt, { SignOptions } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

function createToken(payload: Record<string, unknown>,
    options: SignOptions = { expiresIn: "8h" }
) {
    const token = jwt.sign(payload, process.env.SECRET_KEY!, options)
    return token;
}


export const jwtService = {
    createToken
}