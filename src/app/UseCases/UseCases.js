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
                await product.validate(credential)
                await DAO.registerProduct(product)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    delete_product(id, credential) {
        return new Promise(async (resolve, reject) => {
            if (!id || typeof id !== "string") {
                return reject("The ID must be a valid string")
            }
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSING"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { DAO, SCI } = this

            try {
                await new this.entities.Product({ product: { id: id }, SCI, DAO }).delete(credential)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    edit_product(id, changes, credential) {
        return new Promise(async (resolve, reject) => {
            if (!changes || typeof changes !== "object") {
                return reject("The product changes must be a valid object")
            }
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { entities, DAO, SCI } = this

            try {
                let editedProduct = await new entities.Product({ product: { id: id }, DAO, SCI }).edit(changes)
                await editedProduct.validate(credential)
                await DAO.updateProduct(id, editedProduct)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_product(id, credential) {
        return new Promise(async (resolve, reject) => {
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { entities, SCI, DAO } = this

            try {
                let product = await new entities.Product({ product: { id: id }, DAO, SCI }).load()
                await product.validate(credential)
                console.log({ product })
                resolve(product)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_user_products(credential) {
        return new Promise(async (resolve, reject) => {
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { DAO, SCI, entities } = this
            let config = {
                level: 4,
                scope: {
                    read: true,
                    write: false,
                    third_party: {
                        read: false,
                        write: false
                    }
                }
            }

            try {
                await SCI.Authenticator.checkCredentialClearance(config, credential)
                let products = await new entities.Product({ DAO, SCI }).search({ user: credential.user })
                resolve(products)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    search_inicName(filters, credential) {
        return new Promise(async (resolve, reject) => {
            if (!filters || typeof filters !== "object") {
                return reject("Inci name search filters must be a valid object")
            }
            if (!credential) {
                console.log(Error("CREDENTIAL IS MISSINGF"))
                return reject("INTERNAL SERVER ERROR, TRY LATER")
            }

            let { DAO, SCI, entities } = this

            try {
                let result = await new entities.INCI({ DAO, SCI }).search(filters)
                resolve(result)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}