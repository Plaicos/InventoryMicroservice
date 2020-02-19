module.exports = ({ made_in, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!made_in || typeof made_in !== "string") {
            reject("Made in must be a valid string")
        }

        if (!DAO) {
            console.log(Error("DAO IS NULL !"));
            reject("INTERNAL SERVER ERROR, TRY LATER")
        }

        try {
            if (!await DAO.checkMadeIn(made_in)) {
                return reject(`Made in '${made_in}' does not exist`)
            }
            resolve(made_in)
        }
        catch (erro) {
            reject(erro)
        }
    });
}