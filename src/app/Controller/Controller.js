module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../UseCases/UseCases"))(dependencies)
    }

    handleError(erro, callback) {
        console.log({ erro })
        callback(Error(erro), null)
    }


    add_product() {
        var self = this
        return async function (call, callback) {
            let { product, credential } = call.request

            try {
                await self.UseCases.add_product(product, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    edit_product() {
        var self = this
        return async function (call, callback) {
            let { id, changes, credential } = call.request

            try {
                await self.UseCases.edit_product(id, changes, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    delete_product() {
        var self = this
        return async function (call, callback) {
            let { id, credential } = call.request

            try {
                await self.UseCases.delete_product(id, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_product() {
        var self = this
        return async function (call, callback) {
            let { id, credential } = call.request

            try {
                let product = await self.UseCases.get_product(id, credential)
                callback(null, product)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_user_products() {
        var self = this
        return async function (call, callback) {
            let { credential } = call.request

            try {
                let products = {
                    products: await self.UseCases.get_user_products(credential)
                }
                callback(null, products)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    search_inciName(){
        var self = this
        return async function (call, callback) {
            let { filters, credential } = call.request

            try {
                let result = {
                    result: await self.UseCases.search_inicName(filters, credential)
                }
                callback(null, result)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }
}