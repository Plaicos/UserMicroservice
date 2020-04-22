var DependencyManager = require("./DedendencyManager/DependencyManager")

module.exports = class Application {
    static Dependencies;

    static async InitializeAsync() {
        try {
            Application.Dependencies = await DependencyManager.InitializeAndExportAsync();
            return;
        }
        catch (erro) {
            console.log(erro)
            process.exit();
        }
    }
}