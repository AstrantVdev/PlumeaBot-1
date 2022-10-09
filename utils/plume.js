module.exports = {

    roles(member, plumes, interaction) {
        lower = 0
        roleToAdd = lower
        const path = require("path")
        const fs = require("fs")

        constjson = fs.readFileSync('ROLES.json');
        const roles = new Map(Object.entries(JSON.parse(constjson)));
        
        found =  false
        roles.forEach((points, roleid)=>{
            const role = interaction.guild.roles.cache.get(roleid)
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
        }

    }

}