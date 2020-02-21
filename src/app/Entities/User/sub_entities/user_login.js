module.exports = ({ login, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!login || typeof login !== "string" || login.length < 5) {
            return reject("Login must be a valid string of at least 5 characters")
        }

        try {
            if (await DAO.checkUser(login)) {
                return reject("That login has already been taken")
            }
            resolve(login)

        } catch (error) {
            reject(error)
        }
    });
}