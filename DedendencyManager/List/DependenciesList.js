module.exports = [
    {
        Name:"Database",
        Implementation: require("../Dependencies/Database/Database")
    },
    {
        Name:"DAO",
        Implementation: require("../Dependencies/DAO/DAO")
    },
    {
        Name: "SCI",
        Implementation: require("../Dependencies/SCI/SCI")
    },
    {
        //receita federal
        Name: "RF",
        Implementation: require("../Dependencies/ReceitaFederal/ReceitaFederal")
    },
    {
        Name: "Base64",
        Implementation: require("")
    }
]