async function initialize() {
    var dependencies = await new (require("./Src/config/dependencies/Dependencies"))().build()
    var GRPC = require("./Src/config/GRPC/GRPC")

    GRPC.initialize(dependencies)
}

initialize()