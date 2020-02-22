module.exports = class Warehouse {
    constructor({ DAO, SCI, warehouse }) {
        this.DAO = DAO
        this.SCI = SCI
        this.data = warehouse
        this.entities = require("./SubEntities/WarehouseSubEntities.js")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { DAO, SCI, data, entities } = this
            let { } = data
            let warehouse = {}

            try {

            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    load() {

    }

    methods(warehouse) {
        warehouse.__proto__.assign_user = this.assign_user()
        warehouse.__proto__.change_location = this.change_location()
    }

    assign_user() {
        var self = this
        return function (login) {
            try {
                self.user = login
                return
            }
            catch (erro) {
                reject(erro)
            }
        }
    }

    change_location()
}