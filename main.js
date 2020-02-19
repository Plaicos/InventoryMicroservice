async function initialize(){
    var GRPC = require("./src/config/GRPC/GRPC")
    var dependencies = await new (require("./src/config/dependencies/Dependencies"))().build()

    GRPC.initialize(dependencies)
}

initialize()