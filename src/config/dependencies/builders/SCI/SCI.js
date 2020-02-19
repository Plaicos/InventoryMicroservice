module.exports = class SCI {
    constructor() {
        this.Interface = require("../../../GRPC/GRPC").exportClient()
    }

    build() {
        return new Promise((resolve, reject) => {
            try {
                let CommunicationInterface = {
                    Authenticator: new (require("./Interfaces/Authenticator/AuthInterface"))(this.Interface)
                }
                //console.log({ CommunicationInterface })
                resolve(CommunicationInterface)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}