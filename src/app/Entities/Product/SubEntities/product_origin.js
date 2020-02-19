module.exports = ({ origin, DAO }) => {
    return new Promise(async (resolve, reject) => {

        if (!origin || typeof origin !== "string") {
            return reject(Error("Origin must be a valid string"))
        }
        else if (!DAO) {
            console.log(Error("DAO IS MISSING"));
            reject("INTERNAL SERVER ERROR")
        }

        try {
            if (!await DAO.checkOrigin(origin)) {
                return reject(`Origin '${origin}' does not exist`)
            }
            resolve(origin)
        }
        catch (erro) {
            reject(erro)
        }
    });
}