module.exports = {
    intToABC(string){
        string = string.replace(/0/g,"@")
        string = string.replace(/1/g,"&")
        string = string.replace(/2/g,"~")
        string = string.replace(/3/g,"#")
        string = string.replace(/4/g,"{")
        string = string.replace(/5/g,"§")
        string = string.replace(/6/g,"%")
        string = string.replace(/7/g,"è")
        string = string.replace(/8/g,"à")
        string = string.replace(/9/g,"ç")
        return string

    },

    ABCtoInt(string){
        string = string.replace(/@/g,"0")
        string = string.replace(/&/g,"1")
        string = string.replace(/~/g,"2")
        string = string.replace(/#/g,"3")
        string = string.replace(/{/g,"4")
        string = string.replace(/§/g,"5")
        string = string.replace(/%/g,"6")
        string = string.replace(/è/g,"7")
        string = string.replace(/à/g,"8")
        string = string.replace(/ç/g,"9")
        return string

    }
}