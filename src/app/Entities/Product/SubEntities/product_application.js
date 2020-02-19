module.exports = ({ application, DAO }) => {
    return new Promise(async (resolve, reject) => {

        if (!application || !Array.isArray(application)) {
            return reject("Application must be a valid array")
        }
        else if (!DAO) {
            console.log(Error("DAO IS MISSING"))
            return reject("INTERNAL SERVER ERROR, TRY LATER")
        }
        else {
            try {
                for (let i of application) {
                    if (!await DAO.checkApplication(i)) {
                        return reject(`Application '${i}' does not exist`)
                    }
                }
                resolve(application)
            } 
            catch (erro) {
                reject(erro)
            }
        }
    });
}