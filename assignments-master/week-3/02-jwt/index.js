const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPassword = 'secret';


function verifyUserCreds(email, password){
    const emailSchema = zod.string().email()
    const passSchema = zod.string().min(6)

    if (!emailSchema.safeParse(email).success || !passSchema.safeParse(password).success){
        return false
    }
    return true

}

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    if (!verifyUserCreds(username, password)){
        return null
    }


    const userDetails = {
        username,
        password
    }
    const jwtToken = jwt.sign(userDetails, jwtPassword)
    return jwtToken
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    try {
        const verification = jwt.verify(token, jwtPassword)
        return true
    } catch (error) {
        return false 
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const decodedObject = jwt.decode(token)
    return decodedObject === null ? false : true 
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
