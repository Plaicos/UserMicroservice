async function initialize() {
    var dependencies = await new (require("./src/config/dependencies/Dependencies"))().build()
    var GRPC = require("./src/config/GRPC/GRPC")

    GRPC.initialize(dependencies)
}

initialize()