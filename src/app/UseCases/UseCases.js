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

    getUser(login, credential) {
        return new Promise(async (resolve, reject) => {
            if (!login || typeof login !== "string") {
                return reject("User must be a valis string")
            }
            if (!credential) {
                return reject("Unathorized, missing credential")
            }

            let { DAO, entities, SCI } = this

            try {
                let user = await new entities.User({ user: { login: login }, DAO, SCI }).load()
                await user.validate(credential)
                user.remove_password()
                resolve(user)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    signUp(data) {
        return new Promise(async (resolve, reject) => {
            if (!data || typeof data !== "object") {
                return reject("Sign up data must be a valid object")
            }

            let { user_data, payment_data } = data
            let { DAO, SCI, RF, entities } = this
            let rollback = { userCreated: false, credentialCreated: false, paymentApproved: false }

            try {
                var user = await new entities.User({ user: user_data, DAO, SCI, RF }).build()

                //user registering
                await DAO.registerUser(user)
                rollback.userCreated = true

                //credential creation
                await SCI.Authenticator.createCredential({
                    level: 4, user: user.login, scope: {
                        read: true, write: true, third_party: { read: false, write: false }
                    }
                })
                rollback.credentialCreated = true

                //simulates payment approval
                rollback.paymentApproved = false

                resolve()
            }
            catch (erro) {
                if (!rollback.userCreated) {
                    return reject(erro)
                }

                let credential = {
                    user: user.login,
                    level: 4,
                    scope: {
                        read: true,
                        write: true,
                        third_party: {
                            read: false,
                            write: false
                        }
                    }
                }

                if (rollback.userCreated && !rollback.credentialCreated && !rollback.paymentApproved) {
                    reject(erro)
                    console.log("Payment Processing error, deleting user")

                    try {
                        await this.deleteUser(user.login, credential)
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
                if (rollback.userCreated && rollback.credentialCreated && !rollback.paymentApproved) {
                    reject(erro)
                    console.log("Payment Processing error, deleting user and credential")

                    try {
                        await this.deleteUser(user.login, credential)
                        await SCI.Authenticator.deleteCredential(user.login, credential)
                        return
                    }
                    catch (erro) {
                        this.rollback_log({
                            type: "Rollback Error",
                            message: `Failed to rollback in sign up use case due to payment failure, could not delete user and user credential from:'${user.login}'`,
                            catched: JSON.stringify(erro)
                        })
                        return
                    }
                }
            }
        })
    }

    log_in(data) {
        return new Promise(async (resolve, reject) => {
            if (!data || typeof data !== "object") {
                return reject("Log in data must be a valid object")
            }

            let { entities, DAO, SCI } = this

            try {
                let user = await new entities.User({ user: { login: data.login }, DAO, SCI }).load()
                if (data.password === user.password) {
                    let session = {
                        status: "ok",
                        session_data: {
                            logged_user: data.login,
                            token: await SCI.Authenticator.generateToken(user.login)
                        }
                    }
                    resolve(session)
                }
                else {
                    return reject("Wrong Password")
                }
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    checkUser(login) {
        return new Promise(async (resolve, reject) => {
            if (!login || typeof login !== "string") {
                return reject("User login must be a valid string")
            }

            let { DAO, entities } = this

            try {
                if (await DAO.checkUser(login)) {
                    return resolve(true)
                }
                else {
                    return resolve(false)
                }
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    deleteUser(login, credential) {
        return new Promise(async (resolve, reject) => {
            if (!login || typeof login !== "string") {
                return reject("Login must be a valid string")
            }
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { DAO, entities, SCI } = this

            try {
                let user = await new entities.User({ user: { login: login }, DAO, SCI }).load()
                await user.validate(credential)
                await user.delete()
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getUserWarehouses(login, credential) {
        return new Promise(async (resolve, reject) => {
            if (!login || typeof login !== "string") {
                return reject("Login must be a valid string")
            }
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }
            if (login !== credential.user) {
                var config = { level: 3, scope: { read: false, write: false, third_party: { read: true, write: true } } }
            }
            else {
                var config = { level: 4, scope: { read: true, write: true, third_party: { read: false, write: false } } }
            }

            let { entities, DAO, SCI } = this

            try {
                await SCI.Authenticator.checkCredentialClearance(config, credential)
                let warehouses = await new entities.Warehouse({ warehouse: { user: login }, DAO }).loadAll()
                resolve(warehouses)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getUserWarehouse(login, id, credential) {
        return new Promise(async (resolve, reject) => {

            if (!login || typeof login !== "string") {
                return reject("Login must be a valid string")
            }

            if (!id || typeof id !== "string") {
                return reject("Warehouse id must be a valid string")
            }

            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            if (login !== credential.user) {
                var config = { level: 3, scope: { read: false, write: false, third_party: { read: true, write: true } } }
            }
            else {
                var config = { level: 4, scope: { read: true, write: true, third_party: { read: false, write: false } } }
            }

            let { entities, DAO, SCI } = this

            try {
                await SCI.Authenticator.checkCredentialClearance(config, credential)
                let warehouse = await new entities.Warehouse({ warehouse: { user: login, id }, DAO }).load()
                resolve(warehouse)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    rollback_log(obj) {
        const log = require('./node_modules/log-to-file');
        log(JSON.stringify(obj))
        return
    }

}