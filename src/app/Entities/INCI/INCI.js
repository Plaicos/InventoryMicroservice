module.exports = class INCI {
    constructor({ DAO, SCI, inci }) {
        this.DAO = DAO
        this.SCI = SCI
        this.data = inci
        this.entities = require("./SubEntities/InciSubEntities")
    }

    search(filters) {
        return new Promise(async (resolve, reject) => {
            let { DAO, entities } = this
            let { inci_name, limit, offset } = filters
            let filter = {}

            try {
                //!*important in the db the field is "inci" not "inci_name"
                filter.inci = await entities.search.inci_name(inci_name)
                if(limit){
                    filter.limit = await entities.search.limit(limit)
                }
                else {
                    filter.limit = 25
                }
                if(offset){
                    filter.offset = await entities.search.offset(offset)
                }
                else {
                    filter.offset = 0
                }
                //
                let result = await DAO.searchInci(filter)
                resolve(result)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}