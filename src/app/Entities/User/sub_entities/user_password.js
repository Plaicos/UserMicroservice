module.exports = (password) => {
    return new Promise(async (resolve, reject) => {

        if (typeof password !== "string" || password.length < 10) {
            reject("Password must be a valid string of at least 10 characters")
        }

        let regex = /\W/

        try {
            if (regex.test(password)) {
                return reject("Password cant contain special characters. Possible characters are: [a-z A-Z 0-9]")
            }
            resolve(password)
        }
        catch (erro) {
            reject(erro)
        }
    })
}