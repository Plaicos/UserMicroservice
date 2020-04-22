var IIDependency = require("../../InhertedInterface/Dependency");

class ReceitaFederal extends IIDependency {
    static AsyncInitMustBeCalled = false;
    static CNPJ = require("./CNPJ/CNPJ_Validator")
}