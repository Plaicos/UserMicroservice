var SCI = require("../SCI")

module.exports = class AuthSCI {
    static CreateCredential(credential) {
        return new Promise((resolve, reject) => {
            SCI.GrpcClient.Authenticator.createCredential(credential, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve()
                }
                else {
                    reject("Something went wrong in credential creation")
                }
            })
        });
    }

    static CheckCredentialClearance(config, credential) {
        return new Promise((resolve, reject) => {
            SCI.GrpcClient.Authenticator.checkCredentialClearance({ config, credential }, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve()
                }
                else {
                    reject("Something went wrong in credential creation")
                }
            })
        });
    }

    static Authenticate(token) {
        return new Promise((resolve, reject) => {
            SCI.GrpcClient.Authenticator.authenticate({ token }, (erro, credential) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(credential)
            })
        });
    }

    static GenerateToken(user) {
        return new Promise((resolve, reject) => {
            SCI.GrpcClient.Authenticator.generateToken({ user }, (erro, token) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(token.token)
            })
        });
    }

    static DeleteCredential(user, credential) {
        return new Promise(async (resolve, reject) => {
            SCI.GrpcClient.Authenticator.deleteCredential({ user, credential }, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve()
                }
                else {
                    reject("Something went wrong in credential deletion")
                }
            })
        })
    }
}