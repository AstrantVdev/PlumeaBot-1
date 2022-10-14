const { exists } = require("fs")

module.exports = {
    save(dt, words, author, author_pseudo, message1, message2){
        const editJson = require("edit-json-file")
        const data = editJson(DATA)

        let texts = data.get("texts.list")
        texts.push(dt)
        data.set("texts.list", texts)

        data.set("texts."+dt+".words", words)
        data.set("texts."+dt+".author", author)
        data.set("texts."+dt+".author_name", author_pseudo)
        data.set("texts."+dt+".message1", message1) //embed message id
        data.set("texts."+dt+".message2", message2) //embed message id where is pdf file
        data.save()

    },

    exists(dt){
        const editJson = require("edit-json-file")
        const data = editJson(DATA)

        let texts = data.get("texts.list")
        if(texts.includes(dt)){
            return true
        }else{
            return false
        }
    },

    author(dt){
        const editJson = require("edit-json-file")
        const data = editJson(DATA)

        return data.get("texts." + dt + ".author")
    },

    removeMessages(dt){
        const editJson = require("edit-json-file")
        const dataConfig = editJson(DATA_CONFIG)
        const data = editJson(DATA)
        text_channel = dataConfig.get("channels.text")
        message1 = data.get("texts." + dt + ".message1")
        message2 = data.get(("texts." + dt + ".message2"))

        client.channels.fetch(text_channel)
        .then(channel => 
            channel.messages.fetch(1029692829338980392)
            .then(async m =>
                await m.edit("Your new message."))  
 
            .catch(console.error)
        ).catch(console.error)

        client.channels.fetch(text_channel)
        .then(channel => 
            channel.messages.fetch(1029694364185800754)
            .then(async m =>
                await m.edit("Your new message."))  
            .catch(console.error)
        ).catch(console.error)
    },

    isInChannel(channel_id){
        const editJson = require("edit-json-file")
        const data = editJson(DATA_CONFIG)
        text_channel = data.get("channels.text")

        if(channel_id == text_channel){
            return true
        }else{
            return false
        }
    }

}