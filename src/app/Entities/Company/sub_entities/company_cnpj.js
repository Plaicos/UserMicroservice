module.exports = ({ cnpj, RF }) => {
    return new Promise(async (resolve, reject) => {
        if (!cnpj || typeof cnpj !== "string") {
            return reject("CNPJ must be a valid string")
        }

        try {
            let rf_data = await RF.validateCNPJ(cnpj)
            resolve(rf_data)
        }
        catch (erro) {
            reject(erro)
        }
    })
}