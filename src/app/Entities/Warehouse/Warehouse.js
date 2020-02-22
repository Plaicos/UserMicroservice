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
                warehouse.location = await entities.location({ location: data, DAO, SCI })
                warehouse = this.methods(warehouse)
                resolve(warehouse)
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