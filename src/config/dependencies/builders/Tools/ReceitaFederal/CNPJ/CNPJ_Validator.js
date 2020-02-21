module.exports = (cnpj) => {
    return new Promise(async (resolve, reject) => {
        let axios = require("axios")

        function parse_cnpj(cnpj) {
            cnpj = cnpj.replace(/[^0-9]/g, "")
            if (cnpj.length < 1) {
                throw ("Invalid CNPJ")
            }
            return (cnpj)
        }

        if (!cnpj || typeof cnpj !== "string") {
            reject("CNPJ CANT BE NULL")
        }
        
        try {
            cnpj = parse_cnpj(cnpj)
            axios({
                method: 'get',
                url: `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
                responseType: 'json'
            })
                .then(function (response) {
                    resolve(response.data)
                })
                .catch((erro) => {
                    return reject("Falha na verificação do CNPJ com a Receita Federal")
                })
        }
        catch (erro) {
            reject(erro)
        }
    })
}