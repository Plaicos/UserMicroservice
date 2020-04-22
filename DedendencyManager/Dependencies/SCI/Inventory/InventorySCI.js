var SCI = require("../SCI")

module.exports = class InventorySCI {
    static CheckLocation(location) {
        return new Promise((resolve, reject) => {
            SCI.GrpcClient.Inventory.check_location(location, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        });
    }
}