module.exports = class API {
    constructor(dependencies) {
        if (!dependencies) {
            console.log("GRPC API FACTORY ERROR: NO DEPENDENCIES, ABORTING PROCESS...")
            process.abort()
        }

        this.dependencies = dependencies
        this.Controller = require("../../../../../src/app/Controller/Controller.js")
    }

    build() {
        let { dependencies, Controller } = this
        Controller = new Controller(dependencies)

        let api = {
            add_product: Controller.add_product(),
            edit_product: Controller.edit_product(),
            delete_product: Controller.delete_product(),
            get_user_products: Controller.get_user_products(),
            search_inciName: Controller.search_inciName(),
            check_location: Controller.check_location(),
            get_product: Controller.get_product()
        }
        return Object.freeze(api)
    }

}