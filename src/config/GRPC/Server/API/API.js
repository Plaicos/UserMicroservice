module.exports = class API {
    constructor(dependencies) {
        if (!dependencies) {
            console.log("GRPC API FACTORY ERROR: NO DEPENDENCIES, ABORTING PROCESS...")
            process.abort()
        }

        this.dependencies = dependencies
        this.Controller = require("../../../../../src/app/Controller/Controller.js")
    }

    build() {
        let { dependencies, Controller } = this
        Controller = new Controller(dependencies)

        let api = {
            sign_up: Controller.sign_up(),
            delete_user: Controller.delete_user(),
            get_user: Controller.get_user(),
            log_in: Controller.log_in(),
            check_user: Controller.check_user(),
            get_user_warehouses: Controller.get_user_warehouses(),
            get_user_warehouse: Controller.get_user_warehouse()
        }
        return Object.freeze(api)
    }

}