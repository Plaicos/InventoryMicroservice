module.exports = ({ inci_name, DAO }) => {
    return new Promise(async (resolve, reject) => {

        if (!inci_name || !Array.isArray(inci_name)) {
            return reject("Inci name must be a valid array")
        }
        else if (!DAO) {
            console.log(Error("DAO IS NULL !"));
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }

        try {
            for (let i of inci_name) {
                if (!await DAO.checkInciName(i)) {
                    return reject(`Inci Name '${i}' does not exist`)
                }
            }
            resolve(inci_name)
        }
        catch (erro) {
            reject(erro)
        }
    });
}