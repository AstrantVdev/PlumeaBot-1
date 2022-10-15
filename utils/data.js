module.exports = {
    async save(){
        const request = require(`request`)
        const fs = require(`fs`)
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)
        
        await client.channels.fetch(dataConfig.get("channels.logs"))
        .then(channel => 
            channel.messages.fetch(dataConfig.get("messages.data"))
            .then(async m =>
                request.get(m.attachments.first().url)
                .on('error', console.error)
                .pipe(fs.createWriteStream('DATA.json')))  
        
            .catch(console.error)
        ).catch(console.error)
    },

    async upload(){
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG);

        await client.channels.fetch(dataConfig.get("channels.logs"))
        .then(channel => 
            channel.messages.fetch(dataConfig.get("messages.data"))
            .then(m =>
                m.edit({content:"",
                    files: ["./DATA.json"]
                })) 
        
            .catch(console.error)
        ).catch(console.error)

        await client.channels.fetch(dataConfig.get("channels.logs"))
        .then(channel => 
            channel.send({files: ["./DATA.json"]})
            .catch(console.error)
        ).catch(console.error)
    },

    async accountCreate(user){
        const editJsonFile = require("edit-json-file")
        const json = require("./json.js")
        const dataUtils = require("./data.js")
        const id = json.intToABC(user.id)
        const data = editJsonFile(DATA);

        members = data.get("members.list")
        const today = new Date()
        const date = ("0" + today.getDate()).slice(-2)
        const month = ("0" + (today.getMonth() + 1)).slice(-2)
        const year = today.getFullYear()

        members.push(id)
        
        await data.set("members.list", members)
        await data.set("members." + id +".date", year+month+date)
        await data.set("members." + id+".plumes", 0)
        await data.set("members." + id+".scriptucoins", 0)
        await data.set("members." + id+".pseudo", user.username)
        await data.save()

        await dataUtils.upload()
        
    }
}