module.exports = class Client {
    constructor() {
        this.Services = new (require("./Services/ServiceFactory"))().makeServices()
        this.Credentials = new (require("./credential/CredentialFactory"))()
        this.config = require("./config")
    }

    build() {
        let { Services, Credentials, config } = this
      
        var Client = {
            Authenticator: new Services.AuthPackage.Authenticator(config.port.Authenticator, Credentials.makeCredential(Credentials.Services.Authenticator))
        }
        return Client
    }

}