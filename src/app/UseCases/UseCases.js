module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI, Tools } = dependencies
        let { RF } = Tools

        this.RF = RF
        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    signUp(data) {
        return new Promise(async (resolve, reject) => {
            if (!data || typeof data !== "object") {
                return reject("Sign up data must be a valid object")
            }

            let { DAO, SCI, RF, entities } = this
            let rollBack = {
                userCreated: false,
                paymentApproved: false
            }

            try {
                var user = await new entities.User({ user: data.user_data, DAO, SCI, RF }).build()
                await DAO.registerUser(user)
                rollBack.userCreated = true
                //
                resolve()
            }
            catch (erro) {
                if (!rollBack.userCreated) {
                    return reject(erro)
                }
                if (rollBack.userCreated && !rollBack.paymentApproved) {
                    reject(erro)
                    console.log("Payment Processing error, deleting user")
                    await this.deleteUser(user.login)
                }
            }
        })
    }

    deleteUser(login) {
        
    }

}