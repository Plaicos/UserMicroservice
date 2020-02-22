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

            if (!data || typeof data !== "object") {
                return reject("Warehouse data must be a valid object")
            }

            let { location } = data
            let warehouse = new Object()

            try {
                warehouse.location = await entities.location({ location: location, DAO, SCI })
                warehouse = this.methods(warehouse)
                resolve(warehouse)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    load() {
        return new Promise(async (resolve, reject) => {
            let { DAO, data } = this
            let { user, id } = data

            if (!id || typeof id !== "string") {
                return reject("Warehouse ID must be a valid string")
            }

            if (!user || typeof user !== "string") {
                return reject("Warehouse user must be a valid string")
            }

            try {
                let warehouse = await DAO.getUserWarehouse(user, id)
                resolve(warehouse)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    loadAll() {
        return new Promise(async (resolve, reject) => {
            let { DAO, data } = this
            let { user } = data

            if (!user || typeof user !== "string") {
                return reject("Warehouse user must be a valid string")
            }

            try {
                let warehouses = await DAO.getUserWarehouses(user)
                resolve(warehouses)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    methods(warehouse) {
        warehouse.__proto__.assign_user = this.assign_user()
        //warehouse.__proto__.change_location = this.change_location()
        return warehouse;
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

    change_location() {

    }
}