var CredentialFactory = new (require("./credential/CredentialFactory"))()
var url = require("./URL/servicesURLS")

var client_config = {
    port: {
        Authenticator: url.Authenticator
    }
}

module.exports = client_config 