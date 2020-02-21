module.exports = class Tools {
    constructor() {
        //this.Authenticator = new (require("./Authenticator/Authenticator"))()
        this.Base64 = new (require("./base64/Base64"))()
        this.RF = new (require("./ReceitaFederal/RF"))()
    }

    build() {
        let Tools = {
            Base64: this.Base64,
            RF: this.RF
        }
        console.log({Tools});
        return Tools;
    }

}