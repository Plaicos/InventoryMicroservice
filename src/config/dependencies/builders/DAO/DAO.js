module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            products: db.collection("products"),
            types: db.collection("types"),
            madeIn: db.collection("countries"),
            origins: db.collection("origins"),
            applications: db.collection("applications"),
            inci: db.collection("inci"),
            functions: db.collection("functions")
        }
    }

    registerProduct(product) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("DAO product", product)
                //await this.collections.products.insertOne(product)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    checkAvailability(availability) {

    }

    checkMadeIn(made_in) {
        return new Promise(async (resolve, reject) => {
            this.collections.madeIn.find({ name: made_in }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }

                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    checkApplication(application) {
        return new Promise(async (resolve, reject) => {
            this.collections.applications.find({ application: application }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }
                
                if (result.length > 0) {
                    return resolve(true)
                }
                else {
                    return resolve(false)
                }
            })
        })
    }

    checkType(type) {
        return new Promise(async (resolve, reject) => {
            this.collections.types.find({ type: type }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }

                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    checkInciName(inci_name) {
        return new Promise(async (resolve, reject) => {
            this.collections.inci.find({ inci: inci_name }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }
                if (result.length > 0) {
                    return resolve(true)
                }
                else {
                    return resolve(false)
                }
            })
        })
    }

    checkOrigin(origin) {
        return new Promise(async (resolve, reject) => {
            this.collections.origins.find({ origin: origin }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }

                if (result.length > 0) {
                    return resolve(true)
                }
                else {
                    return resolve(false)
                }
            })
        })
    }
}