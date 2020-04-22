var IIDependency = require("../../InhertedInterface/Dependency");

module.exports = class DAO extends IIDependency {
    static AsyncInitMustBeCalled = false;

    constructor(db) {
        this.Db = db;
    }
    //properties
    db;
    ObjectId;
    collection;
    //methods
    SetDatabase(db) {
        this.db = db.Connection;
        this.ObjectId = db.ObjectId
        this.collections = {
            users: db.collection("users"),
            userTypes: db.collection("user_types"),
            companyTypes: db.collection("company_types"),
            plans: db.collection("plans")
        }
    }

    searchProduct(filters) {
        return new Promise(async (resolve, reject) => {
            try {
                let offset = filters.offset
                let limit = filters.limit
                delete filters.offset
                delete filters.limit

                this.collections.products.find(filters).limit(limit).skip(offset).toArray((erro, result) => {
                    if (erro) {
                        reject(erro)
                    }
                    else {
                        console.log({ filters, result })
                        resolve(result)
                    }
                })
            }
            catch (erro) {
                erro
            }
        })
    }

    registerUser(user) {
        let { ObjectId } = this
        return new Promise(async (resolve, reject) => {
            try {

                for (let i = 0; i < user.warehouses.length; i++) {
                    let _id = ObjectId()
                    user.warehouses[i]._id = _id
                }

                await this.collections.users.insertOne(user)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    updateUser(login, user) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this
            try {
                await this.collections.users.update({ login: login }, user)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getUser(login) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.users.find({ login: login }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    if (result.length === 0) {
                        return reject("That login does not refere to any user")
                    }
                    resolve(result[0])
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    deleteUser(login) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                await this.collections.users.deleteOne({ login: login })
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    checkUser(login) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.users.find({ login: login }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if (result.length > 0) {
                        resolve(true)
                    }
                    else {
                        resolve(false)
                    }
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    checkUserType(type) {
        return new Promise(async (resolve, reject) => {
            this.collections.userTypes.find({ type: type }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }

                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    checkCompanyType(type) {
        return new Promise(async (resolve, reject) => {
            this.collections.companyTypes.find({ type: type }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }

                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    checkPlan(plan) {
        return new Promise(async (resolve, reject) => {
            this.collections.plans.find(plan).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }

                if (result.length > 0) {
                    resolve(result[0])
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    getUserWarehouses(login) {
        return new Promise(async (resolve, reject) => {
            try {
                this.collections.users.find({ login: login }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    if (result.length === 0) {
                        return reject("User has no warehouse")
                    }
                    resolve(result[0].warehouses)
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getUserWarehouse(login, id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.users.find({ login: login, warehouses: { $elemMatch: { _id: ObjectId(id) } } }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    if (result.length === 0) {
                        return reject("That ID does not refere to any warehouse")
                    }
                    for (let i of result[0].warehouses) {
                        if (ObjectId(id).equals(ObjectId(i._id))) {
                            return resolve(i)
                        }
                    }
                    reject("Something went wrong finding the warehouse")
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }
}