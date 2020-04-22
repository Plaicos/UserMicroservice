var IIDependency = require("../../InhertedInterface/Dependency");

module.exports = class SCI extends IIDependency {
    static AsyncInitMustBeCalled = false;
    static GrpcClient;

    Auth = require("./Auth/AuthSCI")
    Inventory = require("./Inventory/InventorySCI")

    SetGrpcClient(client) {
        SCI.GrpcClient = client;
    }

}