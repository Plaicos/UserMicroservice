module.exports = class ReceitaFederal {
    constructor() {
        this.cnpj_validator = require("./CNPJ/CNPJ_Validator")
    }

    validateCNPJ(cnpj) {
        return new Promise(async (resolve, reject) => {
            let { cnpj_validator } = this

            try {
                let cnpj_data = await cnpj_validator(cnpj)
                resolve(cnpj_data)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}