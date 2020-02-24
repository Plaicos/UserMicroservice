module.exports = (value) => {
    return new Promise(async (resolve, reject) => {
        if (!value || typeof value !== "number" || isNaN(parseFloat(value))) {
            return reject("Company minimal sale value must be a valid decimal number")
        }
        resolve(value)
    })
}