module.exports = class Product {
    constructor({ product, DAO }) {
        this.product = product
        this.DAO = DAO
        this.entities = require("./SubEntities/ProductSubEntities")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO, product } = this

            if (!product || typeof product !== "object") {
                return reject("The Product must be a valid object")
            }

            let { type } = product

            try {
                type = await entities.type({ type, DAO })
                let global = await this.global(product)
                let typeExclusive = await this[type](product)
                let methods = this.methods()
                let newProduct = { ...global, ...typeExclusive, ...methods }
                console.log(newProduct)
                //
                resolve(newProduct)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    global(product) {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO } = this
            let { user, name } = product

            try {
                user = await entities.user({ user, DAO })
                name = await entities.name(name)

                let globalFields = {
                    user,
                    name
                }
                resolve(globalFields)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    methods() {
        let methods = {
            validate: this.validate()
        }
        return methods;
    }

    raw_material(data) {
        return new Promise(async (resolve, reject) => {
            let { DAO, entities } = this
            let {
                manufacturer,
                made_in,
                application,
                inci_name,
                functions,
                origin,
                lead_time,
                shelf_life,
                availability,
                packing,
                free_from } = data

            try {

                inci_name = await entities.inci_name({ inci_name, DAO })
                functions = functions
                origin = await entities.origin({ origin, DAO })
                manufacturer = await entities.manufacturer(manufacturer)
                made_in = await entities.made_in({ made_in, DAO })
                application = await entities.application({ application, DAO })
                shelf_life = await entities.shelf_life({ shelf_life })
                lead_time = await entities.lead_time({ lead_time })
                /* MOVE TO MARKETPLACE
                availability = await entities.availability({ availability, DAO })
                */
                packing = await entities.packing({ packing })
                free_from = await entities.free_from(free_from)

                let newRawMaterial = {
                    manufacturer,
                    made_in,
                    application,
                    inci_name,
                    functions,
                    origin,
                    lead_time,
                    shelf_life,
                    packing,
                    free_from
                }
                resolve(newRawMaterial)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    validate() {
        return function (credential) {
            console.log(this)
        }
    }
}