module.exports = ({ user, SCI }) => {
    return new Promise(async (resolve, reject) => {
        if (!user || typeof user !== "string") {
            return reject("Product user must be a valid string")
        }
        // if (!SCI) {
        //     console.log(Error("SCI IS MISSING"))
        //     return reject("INTERNAL SERVER ERROR, TRY LATER")
        // }

        try {
            // if (!await SCI.User.checkUser(user)) {
            //     return reject(`User '${user}' does not exist`)
            // }
            resolve(user)
        }
        catch (erro) {
            reject(erro)
        }
    })
}