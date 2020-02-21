module.exports = class Company {
    constructor({ DAO, SCI, RF, company }) {
        this.data = company
        this.RF = RF
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./sub_entities/sub_entities.js")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO, SCI, RF, data } = this

            if (!data || typeof data !== "object") {
                return reject("Company data must be a valid object")
            }

            let { cnpj, phone, type, certifications, minimal_sale_value, icms,
                pis, cofins, state_subsId } = data
            let company = new Object()

            try {

                company.type = await entities.type({ DAO, type })
                company.minimal_sale_value = await entities.minimal_sale_value(minimal_sale_value)
                company.icms = await entities.icms(icms)
                company.pis = await entities.pis(pis)
                company.cofins = await entities.cofins(cofins)
                let rf_data = await entities.cnpj({ RF, cnpj })
                company.cnpj = rf_data.cnpj
                company.fantasy_name = rf_data.fantasia
                company.name = rf_data.nome
                company.size = rf_data.size
                company.phone = rf_data.telefone
                company.address = `${rf_data.logradouro} ${rf_data.numero} ${rf_data.complemento}`
                company.size = rf_data.porte
                company.zip = rf_data.cep
                company.email = rf_data.email
                company.status = rf_data.status


                resolve(company)
                // var _company = {
                //     certifications: certifications, // entidade
                // }
            }
            catch (erro) {
                reject(erro)
            }
        })
    }
}