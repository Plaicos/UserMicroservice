module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    signUp(data) {
        return new Promise(async (resolve, reject) => {
            if (!data || typeof data !== "object") {
                return reject("Sign up data must be a valid object")
            }

            let { DAO, SCI, entities } = this

            try {
                let user = await new entities.User({ user: data.user_data, DAO, SCI }).build()
                await DAO.registerUser(user)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}