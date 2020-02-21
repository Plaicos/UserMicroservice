module.exports = ({ type, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!type || typeof type !== "string") {
            return reject("Company Type must be a valid string")
        }
        if (!DAO) {
            console.log(Error("DAO IS MISSING"))
            return reject("INTERNAL SERVER ERROR, TRY LATER.")
        }

        try {
            if (!await DAO.checkCompanyType(type)) {
                return reject("Invalid Company Type")
            }
            resolve(type)
        }
        catch (error) {
            reject(error)
        }
    })
}