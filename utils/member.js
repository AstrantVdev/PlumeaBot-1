const editJsonFile = require("edit-json-file")
const json = require("./json.js")

module.exports = {

    async addWeeklyWords(userId, words){
        const data = editJsonFile(DATA)

        userId = json.intToABC(userId)
        weekly = this.getWeeklyWords(userId)
        weekly += words
        await data.set("members."+userId+".weeklyWords", weekly)
        await data.save()
        
    },

    getWeeklyWords(userId){
        const data = editJsonFile(DATA)
        
        userId = json.intToABC(userId)
        weekly = data.get("members."+userId+".weeklyWords")
        return weekly
    },

    toMuchWeeklyWords(userId,words){
        userId = json.intToABC(userId)
        weekly = this.getWeeklyWords(userId)

        if (weekly + words > 20000){
            return true
        }else{
            return false
        }

    },

    async resetAllWeeklyWords(){
        const data = editJsonFile(DATA)

        members = data.get("members.list")

        members.forEach(async m =>{
            await data.set("members."+m+".weeklyWords",0)
            await data.save()
        })

    },

    isWeeklyResetTime(){
        const data = editJsonFile(DATA)

        today = new Date()
        resetDay = new Date(data.get("weeklyReset"))

        if (today > resetDay){
            return true
        }else{
            return false
        }

    },

    async setWeeklyReset(){
        const data = editJsonFile(DATA)

        const date = new Date();
        date.setDate(date.getDate() - date.getDay() + 7);
        date.setHours(("0" + 23).slice(-2))
        date.setMinutes(("0" + 0).slice(-2))
        
        await data.set("weeklyReset",date.toString())
        await data.save()
    },

    getTexts(userId){
        const data = editJsonFile(DATA)

        userId  = json.intToABC(userId)
        const texts = data.get("members."+userId+".texts")

        return texts

    },

    async addText(userId, dt){
        const data = editJsonFile(DATA)
        
        userId  = json.intToABC(userId)
        texts = this.getTexts(userId)

        texts.push(dt)

        await data.set("members."+userId+".texts", texts)
        await data.save()

    },

    async removeText(userId, dt){
        const data = editJsonFile(DATA)
        
        userId  = json.intToABC(userId)
        texts = this.getTexts(userId).filter(t => t != dt)

        await data.set("members."+userId+".texts", texts)
        await data.save()

    },

    async deleteTexts(userId){
        const data = editJsonFile(DATA)

        userId  = json.intToABC(userId)

        texts = this.getTexts(userId)

    },

    getTexts(userId){
        userId = json.intToABC(userId)
        const data = editJsonFile(DATA)

        const texts = data.get("members."+userId+".texts")

        return texts
    }

}