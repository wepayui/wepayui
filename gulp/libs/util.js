var fs = require("fs"),
    filePath = require("../filepath");
    
module.exports = {
    deleteHtmlCodeComments: function(code) {
        // var reg = /(\/\/.*)?|(\/\*[\s\S]*?\*\/)/g;
        var reg = /<!--[\w\W]*?-->/g;
        var result = code.replace(reg, "");
        return result;
    },
    deleteJSCodeComments: function(code) {
        var tmp1 = ':\/\/';
        var regTmp1 = /:\/\//g;
        var tmp2 = '@:@/@/@';
        var regTmp2 = /@:@\/@\/@/g;
        code = code.replace(regTmp1, tmp2);
        var reg = /(\/\/.*)?|(\/\*[\s\S]*?\*\/)/g;
        code = code.replace(reg, '');
        result = code.replace(regTmp2, tmp1);
        return result;
    },
    paseJSON: function(code) {
        return JSON.parse(this.deleteJSCodeComments(fs.readFileSync(code,"utf-8")));
        // return JSON.parse(this.deleteJSCodeComments());
    }
}