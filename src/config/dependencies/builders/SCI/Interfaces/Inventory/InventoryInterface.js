module.exports = class InventoryInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    checkLocation(location) {
        return new Promise((resolve, reject) => {
            this.Interface.Inventory.check_location(location, (erro, statusResponse) => {
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