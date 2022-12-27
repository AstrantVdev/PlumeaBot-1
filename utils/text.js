const editJson = require("edit-json-file")
const dataConfig = editJson(DATA_CONFIG)

module.exports = {
    async save(dt, words, author, author_pseudo, id1, id2){
        const data = editJson(DATA)

        let texts = data.get("texts.list")
        texts.push(dt)
        await data.set("texts.list", texts)

        await data.set("texts."+dt+".words", words)
        await data.set("texts."+dt+".author", author)
        await data.set("texts."+dt+".author_name", author_pseudo)
        await data.set("texts."+dt+".message1", id1) //embed message id
        await data.set("texts."+dt+".message2", id2) //embed message id where is pdf file
        await data.save()

    },

    async forumPost(dt, file, description, author, title){
        const forumId = dataConfig.get("channels.textForum")

        client.channels.fetch(forumId)
		.then(async forum => {

            await forum.threads.create({ 
                name: dt, 
                message: {content: description,files:[file]}, 
                appliedTags: [author, title, dt] 
            })

        })
		.catch(console.error)

    },

    exists(dt){
        const data = editJson(DATA)
        const texts = data.get("texts.list")

        if(texts.includes(dt)){
            return true
        }else{
            return false
        }
    },

    words(dt){
        const data = editJson(DATA)

        const words = data.get("texts."+dt+".words")

        return words
    },

    author(dt){
        const data = editJson(DATA)

        return data.get("texts." + dt + ".author")
    },

    removeMessages(dt){
        const data = editJson(DATA)

        text_channel = dataConfig.get("channels.text")
        message1 = data.get("texts." + dt + ".message1")
        message2 = data.get(("texts." + dt + ".message2"))

        client.channels.fetch(text_channel)
        .then(channel =>{

            channel.messages.fetch(message1)
            .then(async m =>
                await m.delete())  
            .catch(console.error)

            channel.messages.fetch(message2)
            .then(async m =>
                await m.delete())  
            .catch(console.error)

        }).catch(console.error)

    },

    async sendMessage(message1){
        const text_channel = dataConfig.get("channels.text")
        let id = 0
        client.channels.fetch(text_channel)
        .then(async channel => 
            await channel.send(message1).then(sent => {
                console.log(sent.id)
                return sent.id
              })
        ).catch(console.error)

    },

    texts(){
        const data = editJson(DATA)

        const texts = data.get("texts.list")

        return texts
    },

    isInChannel(channel_id){
        text_channel = dataConfig.get("channels.text")

        if(channel_id == text_channel){
            return true
        }else{
            return false
        }
    },

    isAuthor(userId, dt){
        const data = editJson(DATA)
        const author = data.get("texts."+dt+".author")

        if(userId == author){
            return true
        }else{
            return false
        }
    },

    async remove(dt){
        const data = editJson(DATA)

        await this.removeMessages(dt)

        await data.unset("texts."+dt)
        await data.save()

        texts = data.get("texts.list").filter(m => m!==dt)
        await data.set("texts.list", texts)
        await data.save()
        
    }

}