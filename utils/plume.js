module.exports = {

    roles(member, plumes, interaction) {
        lower = 0
    
        const json = JSON.stringify(require(ROLESPATH), null, 2)
        const roles = new Map(Object.entries(JSON.parse(json)));

        roles.forEach((points, roleid)=>{
            const role = interaction.guild.roles.cache.get(roleid)
            found =  false
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
        if(roleToAdd != 0) member.roles.add(roleToAdd)

    },

    add(memberId, p) {
    },

    get(memberId){
        return plumes
    }

}