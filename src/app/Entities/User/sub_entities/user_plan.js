module.exports = ({ plan, DAO }) => {
    return new Promise(async (resolve, reject) => {

        if (!plan || typeof plan !== "object") {
            return reject("Plan must be a valid object")
        }

        if (!plan.billing || typeof plan.billing !== "string") {
            return reject("Billing must be a valid string")
        }

        plan = {
            type: plan.type,
            size: plan.size,
            billing: plan.billing
        }
        
        try {
            if (!await DAO.checkPlan(plan)) {
                return reject("That plan does not exist")
            }
            resolve(plan)
        }
        catch (erro) {
            reject(erro)
        }
    });
}