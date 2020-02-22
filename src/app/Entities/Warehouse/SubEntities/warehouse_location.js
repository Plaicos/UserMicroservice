module.exports = ({ location, DAO, SCI }) => {
    return new Promise(async (resolve, reject) => {
        if (!location || typeof location !== "object") {
            return reject(" Warehouse location must be a valid object")
        }

        try {
            if (!await SCI.Inventory.checkLocation(location)) {
                return reject("Invalid Warehouse location")
            }
            resolve(location)
        }
        catch (erro) {
            reject(erro)
        }
    })
}