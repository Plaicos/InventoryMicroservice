module.exports = class Product {
    constructor({ product, DAO, SCI }) {
        this.product = product
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./SubEntities/ProductSubEntities")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO, product } = this

            if (!product || typeof product !== "object") {
                return reject("The Product must be a valid object")
            }

            let { type } = product
            let newProduct = {}

            try {
                await entities.type({ type, DAO })
                let global = await this.global(product)
                let typeExclusive = await this[type](product)
                //
                newProduct = { ...global, ...typeExclusive }
                newProduct.type = type
                newProduct = this.methods(newProduct)
                //
                resolve(newProduct)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    edit(changes) {
        return new Promise(async (resolve, reject) => {
            let { product, DAO, entities } = this
            let { id } = product

            if (!changes || typeof changes !== "object") {
                return reject("Changes must be a valid object")
            }
            let changes_keys = Object.keys(changes)

            try {
                await entities.id({ id, DAO })
                product = await DAO.getProduct(id)
                //
                let type = product.type
                let globalChanges = await this.global(changes, true)
                let typeChanges = await this[type](changes, true)
                //
                changes = { ...globalChanges, ...typeChanges }
                product = Object.assign(product, changes)
                product = this.methods(product)
                resolve(product)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    global(product, editMode) {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO, SCI } = this
            let { user, name } = product
            let globalFields = {}

            try {
                if (!editMode) {
                    globalFields.user = await entities.user({ user, SCI })
                }
                //
                if (editMode && !name) {
                    name = undefined
                }
                else {
                    globalFields.name = await entities.name(name)
                }

                resolve(globalFields)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    // type specific buisness logic
    raw_material(data, editMode) {
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
                let newRawMaterial = {}
                if (editMode && !inci_name) {
                    inci_name = undefined
                }
                else {
                    newRawMaterial.inci_name = await entities.inci_name({ inci_name, DAO })
                }
                //
                if (editMode && !functions) {
                    functions = undefined
                }
                else {
                    newRawMaterial.functions = functions
                }
                //
                if (editMode && !origin) {
                    origin = undefined
                }
                else {
                    newRawMaterial.origin = await entities.origin({ origin, DAO })
                }
                //
                if (editMode && !manufacturer) {
                    manufacturer = undefined
                }
                else {
                    newRawMaterial.manufacturer = await entities.manufacturer(manufacturer)
                }
                //
                if (editMode && !made_in) {
                    made_in = undefined
                }
                else {
                    newRawMaterial.made_in = await entities.made_in({ made_in, DAO })
                }
                //
                if (editMode && !application) {
                    application = undefined
                }
                else {
                    newRawMaterial.application = await entities.application({ application, DAO })
                }
                //
                if (editMode && !shelf_life) {
                    shelf_life = undefined
                }
                else {
                    newRawMaterial.shelf_life = await entities.shelf_life({ shelf_life })
                }
                //
                if (editMode && !lead_time) {
                    lead_time = undefined
                }
                else {
                    newRawMaterial.lead_time = await entities.lead_time({ lead_time })
                }
                //
                if (editMode && !packing) {
                    packing = undefined
                }
                else {
                    newRawMaterial.packing = await entities.packing({ packing })
                }
                //
                if (editMode && !free_from) {
                    free_from = undefined
                }
                else {
                    newRawMaterial.free_from = await entities.free_from(free_from)
                }

                /* MOVE TO MARKETPLACE
                availability = await entities.availability({ availability, DAO })
                */

                resolve(newRawMaterial)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    mix(data, editMode) {
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
                packing = await entities.packing({ packing })
                free_from = await entities.free_from(free_from)

                let Mix = {
                    inci_name,
                    functions,
                    origin,
                    manufacturer,
                    made_in,
                    application,
                    shelf_life,
                    lead_time,
                    packing,
                    free_from
                }
                resolve(Mix)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    // __proto__ injection of methods
    methods(product) {
        product.__proto__.validate = this.validate()
        return product;
    }

    validate() {
        var SCI = this.SCI
        return function (credential) {
            return new Promise(async (resolve, reject) => {
                let config = {
                    level: 4,
                    scope: {
                        read: true,
                        write: true,
                        third_party: {
                            read: false,
                            write: false
                        }
                    }
                }
                try {
                    await SCI.Authenticator.checkCredentialClearance(config, credential)
                    if (credential.user !== this.user) {
                        return reject("Cant operate another user's post")
                    }
                    resolve()
                }
                catch (erro) {
                    reject("Unathorized")
                }
            });
        }
    }
}