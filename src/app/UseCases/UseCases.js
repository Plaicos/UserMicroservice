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
            let rollback = {
                userCreated: false,
                paymentApproved: false
            }

            try {
                var user = await new entities.User({ user: data.user_data, DAO, SCI, RF }).build()
                await DAO.registerUser(user)
                rollback.userCreated = true
                //

                resolve()
            }
            catch (erro) {
                if (!rollback.userCreated) {
                    return reject(erro)
                }
                if (rollback.userCreated && !rollback.paymentApproved) {
                    reject(erro)
                    console.log("Payment Processing error, deleting user")

                    try {
                        await this.deleteUser(user.login)
                    }
                    catch (erro) {
                        this.rollback_log({
                            type: "Rollback Error",
                            message: `Failed to rollback in sign up use case due to payment failure, could not delete user '${user.login}'`,
                            catched: JSON.stringify(erro)
                        })
                        return
                    }
                }
            }
        })
    }

    deleteUser(login) {
        return new Promise(async (resolve, reject) => {
            if (!login || typeof login !== "string") {
                return reject("Login must be a valid string")
            }

            try {
                await 
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    rollback_log(log) {
        const log = require('log-to-file');
        log(log)
        return
    }

}