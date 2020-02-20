module.exports = class User {
    constructor({ user, DAO, SCI }) {
        this.data = this.user
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./sub_entities/sub_entitites.js")
    }

    build() {
        return new Promise(async (resolve, reject) => {

            let { data, DAO, SCI, entities } = this
            let { sign_up_data, payment_data } = data
            let { company } = sign_up_data

            if (!sign_up_data || typeof sign_up_data !== "object") {
                return reject("Sign up data must be a valid object")
            }
            if (!payment_data || typeof payment_data !== "object") {
                return reject("Payment_data data must be a valid object")
            }

            let { login, password, chosen_plan, type, email, recovery_email, clearance_data } = sign_in_data
            let user = new Object()
            

            try {
                login = await this.entities.login({ login })
                password = await this.entities.password({ password })
                type = await this.entities.type({ type: type, Dao: this.Dao })
                email = email
                recovery_email = recovery_email
                chosen_plan = await this.entities.chosen_plan({ chosen_plan: chosen_plan, Dao: this.Dao, size, type })

            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}