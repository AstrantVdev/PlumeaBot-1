module.exports = {

    roles(member, plumes, interaction) {
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

        json = dataConfig.get("roles")
        const roles = new Map(Object.entries(json))
        
        found =  false
        lower = 0
        roleToAdd = 0
        roleBefore = 0
        roles.forEach((points, roleid)=>{
            const role = interaction.guild.roles.cache.get(roleid)
            if(member.roles.cache.find(r => r.id === roleid)){roleBefore = role}

            member.roles.remove(role)

            if (points <= plumes) {
                lower = role
            }else{
                if(!found){
                    roleToAdd = lower
                    found = true
                } 

            }

        })
        if(roleToAdd != 0){
            member.roles.add(roleToAdd)

            if(roleBefore != roleToAdd.id){
                client.channels.fetch(dataConfig.get("channels.plumes"))
                .then(channel => channel.send("<@"+member.user.id+"> " + "vient de devenir un " + roleToAdd.name)
                ).catch(console.error)
            }
            
        }

    },



}