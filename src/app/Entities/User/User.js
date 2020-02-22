module.exports = class User {
    constructor({ user, DAO, SCI, RF }) {
        this.RF = RF
        this.data = user
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./sub_entities/sub_entitites.js")
        this.Company = require("../Company/Company")
        this.Warehouse = require("../Warehouse/Warehouse")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO, SCI, RF, entities, Company, Warehouse } = this

            if (!data || typeof data !== "object") {
                return reject("Sign up data must be a valid object")
            }

            let { login, password, billing, type, email, recovery_email, company, warehouse } = data
            let user = new Object()

            try {
                user.login = await entities.login({ login, DAO })
                user.password = await entities.password(password)
                user.type = await entities.type({ type, DAO })
                user.email = email
                user.recovery_email = recovery_email
                user.company = await new Company({ DAO, SCI, company, RF }).build()
                user.warehouses = [await new Warehouse({ warehouse, DAO, SCI }).build()]
                user.plan = await entities.plan({ plan: { size: user.company.size, type: user.type, billing: billing }, DAO })
                //
                user = await this.methods(user)
                resolve(user)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    load() {
        return new Promise(async (resolve, reject) => {
            let { DAO, entities, data } = this
            let { login } = data

            try {
                if (!await DAO.checkUser(login)) {
                    return reject(`Failed to load, user '${login}' does not exist`)
                }
                let user = await DAO.getUser(login)
                user = await this.methods(user)
                resolve(user)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    methods(user) {
        return new Promise(async (resolve, reject) => {
            user.__proto__.validate = this.validate()
            user.__proto__.delete = this.delete()
            user.__proto__.remove_password = this.remove_password()
            //user.__proto__.change_plan = this.change_plan()
            resolve(user)
        })
    }

    delete() {
        var { DAO, SCI } = this
        return function () {
            return new Promise(async (resolve, reject) => {
                let { login } = this
                let credential = { user: login, level: 4, scope: { read: true, write: true, third_party: { read: false, write: false } } }

                try {
                    await DAO.deleteUser(login)
                    await SCI.Authenticator.deleteCredential(login, credential)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }

    }

    validate() {
        var { SCI } = this
        return function (credential) {
            return new Promise(async (resolve, reject) => {
                if (credential.user !== this.login) {
                    var config = {
                        level: 3,
                        scope: {
                            read: false,
                            write: false,
                            third_party: {
                                read: true,
                                write: true
                            }
                        }
                    }
                }
                else {
                    var config = {
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
                }

                try {
                    await SCI.Authenticator.checkCredentialClearance(config, credential)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    remove_password() {
        return function () {
            delete this.password
        }
    }

    change_plan() {

    }
}
