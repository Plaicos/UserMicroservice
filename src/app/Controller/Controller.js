module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../UseCases/UseCases"))(dependencies)
    }

    handleError(erro, callback) {
        console.log({ erro })
        callback(Error(erro), null)
    }

    sign_up() {
        var self = this
        return async function (call, callback) {
            let data = call.request

            try {
                await self.UseCases.signUp(data)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    delete_user() {
        var self = this
        return async function (call, callback) {
            let { credential, login } = call.request

            try {
                await self.UseCases.deleteUser(login, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_user() {
        var self = this
        return async function (call, callback) {
            let { credential, login } = call.request

            try {
                let user = await self.UseCases.getUser(login, credential)
                callback(null, user)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }
    
    log_in() {
        var self = this
        return async function (call, callback) {
            let login_data = call.request

            try {
                let session = await self.UseCases.log_in(login_data)
                callback(null, session)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    check_user() {
        var self = this
        return async function (call, callback) {
            let { login } = call.request

            try {
                let status = await self.UseCases.checkUser(login)
                if (status === true) {
                    var statusResponse = {
                        status: "ok"
                    }
                }
                else {
                    var statusResponse = {
                        status: `User '${login}' does not exist`
                    }
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_user_warehouses() {
        var self = this
        return async function (call, callback) {
            let { credential, user } = call.request

            try {
                let warehouses = {
                    warehouses: await self.UseCases.getUserWarehouses(user, credential)
                }
                callback(null, warehouses)
                console.log({ warehouses })
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_user_warehouse() {
        var self = this
        return async function (call, callback) {
            let { credential, user, id } = call.request

            try {
                let warehouse = await self.UseCases.getUserWarehouse(user, id, credential)
                callback(null, warehouse)
                console.log({ warehouse })
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }
}