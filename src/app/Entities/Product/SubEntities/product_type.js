module.exports = ({ type, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!type || typeof type !== "string") {
            return reject("Product Type must be a valid string")
        }
        if (!DAO) {
            console.log(Error("DAO IS MISSING"))
            return reject("INTERNAL SERVER ERROR, TRY LATER.")
        }

        try {
            if (!await DAO.checkType(type)) {
                return reject("Invalid Type")
            }
            resolve(type)
        }
        catch (error) {
            reject(error)
        }
    })
}