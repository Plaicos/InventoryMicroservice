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

    searchProduct(filters) {
        return new Promise(async (resolve, reject) => {
            try {
                let offset = filters.offset
                let limit = filters.limit
                delete filters.offset
                delete filters.limit

                this.collections.products.find(filters).limit(limit).skip(offset).toArray((erro, result) => {
                    if (erro) {
                        reject(erro)
                    }
                    else {
                        console.log({ filters, result })
                        resolve(result)
                    }
                })
            }
            catch (erro) {
                erro
            }
        })
    }

    registerProduct(product) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.collections.products.insertOne(product)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    updateProduct(id, product) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this
            try {
                await this.collections.products.update({ _id: ObjectId(id) }, product)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getProduct(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.products.find({ _id: ObjectId(id) }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    if (result.length === 0) {
                        return reject("That ID does not refere to any product")
                    }
                    resolve(result[0])
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    getProductOwner(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.products.find({ _id: ObjectId(id) }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    if (result.length === 0) {
                        return reject("That ID does not refere to any product")
                    }

                    resolve(result[0].user)
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    deleteProduct(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                console.log("deleted")
                await this.collections.products.deleteOne({ _id: ObjectId(id) })
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    checkAvailability(availability) {

    }

    checkProduct(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                this.collections.products.find({ _id: ObjectId(id) }).toArray((erro, result) => {
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
            }
            catch (erro) {
                reject(erro)
            }
        })
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