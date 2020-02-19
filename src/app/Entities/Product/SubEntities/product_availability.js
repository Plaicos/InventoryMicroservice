module.exports = ({ availability, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!availability || typeof availability !== "string") {
            return reject("Availability must be a valid string")
        }

        try {
            if (!await DAO.checkAvailability(availability)) {
                return reject("That availability does not exist")
            }
            resolve(availability)
        }
        catch (erro) {
            reject(erro)
        }
    })
}