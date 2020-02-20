module.exports = ({ id, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!id || typeof id !== "string") {
            return reject("Product ID must be a valid string")
        }

        try {
            if (!await DAO.checkProduct(id)) {
                return reject("That ID does not refer not any product")
            }
            resolve(id)
        }
        catch (erro) {
            reject(erro)
        }
    })
}