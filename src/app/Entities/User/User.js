module.exports = class User {
    constructor({ user, DAO, SCI, RF }) {
        this.RF = RF
        this.data = user
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./sub_entities/sub_entitites.js")
        this.Company = require("../Company/Company")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO, SCI, RF, entities, Company } = this

            if (!data || typeof data !== "object") {
                return reject("Sign up data must be a valid object")
            }

            let { login, password, plan, type, email, recovery_email, company } = data
            let user = new Object()


            try {
                user.login = await entities.login({ login, DAO })
                user.password = await entities.password(password)
                user.type = await entities.type({ type, DAO })
                user.email = email
                user.recovery_email = recovery_email
                user.plan = await entities.plan({ plan, DAO })
                user.company = await new Company({ DAO, SCI, company, RF }).build()
                //
                user = await this.methods(user)
                resolve(user)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    methods(user){
        return new Promise(async (resolve, reject)=>{
            user.__proto__.validate = this.validate()
            resolve(user)
        })
    }

    validate(){
        var self = this
        return async function(){
            resolve()
        }
    }
}