const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile(DATA_CONFIG)
const json = require("../utils/json.js")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    isSprinting() {
        const data = editJsonFile(DATA)

        time = this.getTime()

        if(time == 0){
            return false
        }else{
            return true
        }

    },

    getTime(){
        const data = editJsonFile(DATA)

        time = data.get("sprint.timer")

        return time
    },

    launchEndMessage(time){

        setTimeout(() => {
            const data = editJsonFile(DATA)

            const id = data.get("sprint.message")
            const channel = dataConfig.get("channels.sprint")
            const sprintRole = dataConfig.get("rolesId.sprinter")

            client.channels.fetch(channel)
            .then(channel =>{
                channel.messages.fetch(id)
                .then(async m =>
                    await m.reply("**Le sprint est terminé ! :3**")

                ).catch(console.error)

                this.getSprinters().forEach(sprinterABC =>{
                    id = json.ABCtoInt(sprinterABC)

                    channel.send("<@"+id+">")
                })

            }).catch(console.error)

        }, (time+1)*60*1000);  

    },

    async setTime(min){
        const data = editJsonFile(DATA)

        time = min*60

        await data.set("sprint.timer",time)
        await data.save()
    },

    async timerProgress(sec){
        const data = editJsonFile(DATA)

        time = this.getTime()
        await data.set("sprint.timer",time+sec)
        await data.save()
    },

    isFishished(){
        const data = editJsonFile(DATA)

        time = this.getTime()

        if(time == 0){
            return true
        }else{
            return false
        }
    },

    async setMessage(id){
        const data = editJsonFile(DATA)

        await data.set("sprint.message",id.toString())
        await data.save()
    },

    isChannel(id){
        sprintChannel = dataConfig.get("channels.sprint")

        if(sprintChannel == id){
            return true
        }else{
            return false
        }

    },
    
    async goMessage(sec){
        const data = editJsonFile(DATA)
        const message = require("./message.js")

        sprintChannel = dataConfig.get("channels.sprint")
        id = data.get("sprint.message")

        description = ""

        const sprinters = this.getSprinters()

        sprinters.forEach(s => {
            description += "<@"+json.ABCtoInt(s)+">\n"
        })

        embed = message.newEmbed()
        .setTitle(("__SPRINT !__       " + sec.toString() + " " + sec.toString() + " " + sec.toString() + " "))
        .setDescription(description)

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:"<@&"+dataConfig.get("rolesId.sprinter")+">",embeds:[embed],components: [this.roleButton(), await this.joinButton()]}))      
            .catch(console.error)

        ).catch(console.error)

    },

    roleButton(){
        const sprintRole = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("sprintRole")
                .setLabel("sprintRole")
                .setStyle(ButtonStyle.Primary),
        )

        return sprintRole
    },

    joinButton(){
        const sprintRole = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("sprintJoin")
                .setLabel("sprintJoin")
                .setStyle(ButtonStyle.Primary),
        )

        return sprintRole
    },

    finalButton(){
        const sprintRole = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("sprintFinal")
                .setLabel("mooots")
                .setStyle(ButtonStyle.Primary),
        )

        return sprintRole
    },

    async addSprinter(id, words){
        const data = editJsonFile(DATA)
        id = json.intToABC(id)

        const sprinters = data.get("sprint.sprinters")

        sprinters.push(id)

        await data.set("sprint.sprinters",sprinters)
        await data.set("sprint."+id.toString(),words.toString())
        await data.save()
    },

    isSprinter(id){
        const sprinters = this.getSprinters()
        id = json.intToABC(id)

        if(sprinters.includes(id)){
            return true
        }else{
            return false
        }
    },

    getSprinters(){
        const data = editJsonFile(DATA)

        const sprinters = data.get("sprint.sprinters")

        return sprinters
    },

    async begin(sec, messageId){
        const data = editJsonFile(DATA)

        await this.removeMessageButtons()
        await data.unset("sprint")
        await data.save()

        await data.set("sprint.timer",0)
        await data.set("sprint.description","")
        const none = []
        await data.set("sprint.sprinters",none)
        await data.save()

        await this.setMessage(messageId)

        await this.beginMessage(sec)
    },

    async beginMessage(sec){
        const data = editJsonFile(DATA)
        const message = require("./message.js")

        sprintChannel = dataConfig.get("channels.sprint")
        id = data.get("sprint.message")

        embed = message.newEmbed()
        .setTitle(("Le sprint commence dans   " + sec.toString() + " secondes   :D"))

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:"<@&"+dataConfig.get("rolesId.sprinter")+">",embeds:[embed],components: [await this.roleButton(), await this.joinButton()] }))      
            .catch(console.error)

        ).catch(console.error)

    },

    async finish(){
        const data = editJsonFile(DATA)

        await data.set("timer",0)
        await data.save()
        this.finishMessage()
    },

    finishMessage(){
        const data = editJsonFile(DATA)
        const message = require("./message.js")

        sprintChannel = dataConfig.get("channels.sprint")
        id = data.get("sprint.message")

        embed = message.newEmbed()
        .setTitle(("LE SPRINT EST TERMINE ! :3"))

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:"<@&"+dataConfig.get("rolesId.sprinter")+">",embeds:[embed],components: [await this.finalButton()]}))      
            .catch(console.error)

        ).catch(console.error)

    },

    removeMessageButtons(){
        const data = editJsonFile(DATA)
        const messageId = data.get("sprint.message")
        const ChannelId = dataConfig.get("channels.sprint")

        client.channels.fetch(ChannelId)
        .then(channel => 
            channel.messages.fetch(messageId)
            .then(async m =>
                await m.edit({components:[]}))
 
            .catch(console.error)
        ).catch(console.error)
    },

    async removeSprinter(id){
        const data = editJsonFile(DATA)
        id = json.intToABC(id)

        const sprinters = data.get("sprint.sprinters")

        sprinters.filter(s => s == id)

        await data.set("sprint.sprinters",sprinters)
        await data.unset("sprint."+id)
        await data.save()
    },

    updateFinishMessage(userId, words){
        const data = editJsonFile(DATA)
        const message = require("./message.js")

        const sprintChannel = dataConfig.get("channels.sprint")
        const id = data.get("sprint.message")

        const beginWords = data.get("sprint."+json.intToABC(userId))
        let description = data.get("sprint.description")
        
        description += "<@"+userId+"> a bien profité du sprint en imaginant ***" + (words-beginWords) + " ***mots "

        embed = message.newEmbed()
        .setTitle(("LE SPRINT EST TERMINE ! :3"))
        .setDescription(description)

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:"<@&"+dataConfig.get("rolesId.sprinter")+">",embeds:[embed],components: [await this.finalButton()]}))      
            .catch(console.error)

        ).catch(console.error)
    }

}
