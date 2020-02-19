module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    list_product_types() {
        return new Promise(async (resolve, reject) => {

        })
    }

    add_product(product, credential) {
        return new Promise(async (resolve, reject) => {
            if (!product || typeof product !== "object") {
                return reject("The product must be a valid object")
            }
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { entities, DAO, SCI } = this

            try {
                product = await new entities.Product({ product, DAO, SCI }).build()
                product.validate(credential)
                await DAO.registerProduct(product)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    delete_product(id) {
        return new Promise(async (resolve, reject) => {

        })
    }

    edit_product(is, changes) {
        return new Promise(async (resolve, reject) => {

        })
    }
}