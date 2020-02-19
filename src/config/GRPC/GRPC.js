var serverBuilder = require("./Server/ServerBuilder").build
var serviceFactory = new( require("./Service/ServiceFactory"))
var apiBuilder = require("./API/API")

function initialize(dependencies){
    let service = serviceFactory.makeService()
    let api = new apiBuilder(dependencies).build()
    let server = serverBuilder(service, api)
    
    server.start()
    console.log("GRPC INVENTORY SERVER RUNNING")
    return
}

module.exports = {
    initialize
}