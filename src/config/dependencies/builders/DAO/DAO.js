module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
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
        return new Promise(async (resolve, reject) => {
            try {
                await this.collections.users.insertOne(user)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    updateProduct(id, product) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this
            try {
                await this.collections.products.update({ _id: ObjectId(id) }, product)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getProduct(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.products.find({ _id: ObjectId(id) }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    if (result.length === 0) {
                        return reject("That ID does not refere to any product")
                    }
                    resolve(result[0])
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    deleteProduct(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                console.log("deleted")
                await this.collections.products.deleteOne({ _id: ObjectId(id) })
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

}