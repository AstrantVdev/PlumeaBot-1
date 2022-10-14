const { GuildExplicitContentFilter } = require("discord.js")

module.exports = {
    edit(){
        const editJsonFile = require("edit-json-file")
        const data_config = editJsonFile(DATA_CONFIG)
        const channel_id = data_config.get("channels.leaderboard")
        const id = data_config.get("messages.leaderboard")

        leaderboard = require("./leaderboard")
        client.channels.fetch(channel_id)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:"", embeds: [await leaderboard.create()]}))      
            .catch(console.error)

        ).catch(console.error)

    },

    create(){
        const json = require("./json")
		const editJsonFile = require("edit-json-file")

		let memberfile = editJsonFile(DATA);
		const members = memberfile.get("members.list")
        let winnersPlumes = []
        let winnersId = []

        members.forEach(m=>{
            plumes = memberfile.get("members."+m+".plumes")
            higher = true
            const l = winnersPlumes.length
            for (let i = 0; i < l; i++) {

                if(plumes < winnersPlumes[i]){

                    for (let o = l; o > i; o--) {
                        winnersPlumes[o] = winnersPlumes[o-1]
                        winnersId[o] = winnersId[o-1]

                    }
                    winnersPlumes[i] = plumes
                    winnersId[i] = m

                    higher = false
                    break
                }

            }

            if (higher){
                winnersPlumes.push(plumes)
                winnersId.push(m)
            }             

        })

        let message = "\n"
        const l = winnersId.length
        for(i = l-1 ; (i >= l-10 && i >= 0); i--){
            id = winnersId[i]
            intId = json.ABCtoInt(id)

            m = ""
            if(i == l-1){
                m += ":first_place: "
            }else if(i == l-2){
                m += ":second_place: "
            }else if(i == l-3){
                m += ":third_place: "
            }

            message+= m+"<@"+intId+"> : " + winnersPlumes[i]+"\n---\n"

        }

        const embed = require('./embed');
        const Leaderboard = embed.new()
        .setTitle("LEADERBOARD :")
        .setDescription(message)

        return Leaderboard
    }

}