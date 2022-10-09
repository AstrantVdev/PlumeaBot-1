module.exports = {
    async create(user){
        const editJsonFile = require("edit-json-file")
        const json = require("../utils/json.js")
        const id = json.intToABC(user.id)
        const membersfile = editJsonFile(CHANNELSPATH);

        members = membersfile.get("members.list")
        const today = new Date()
        const date = ("0" + today.getDate()).slice(-2);
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const year = today.getFullYear();
        if(!members.includes(id)){members.push(id)}

        await membersfile.set("members.list", members)
        await membersfile.set("members." + id +".date", year+month+date)
        await membersfile.set("members." + id+".plumes", 0)
        await membersfile.set("members." + id+".scriptucoins", 0)
        await membersfile.set("members." + id+".pseudo", user.username)
        await membersfile.save()
    }
}