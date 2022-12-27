const { Client, Collection, IntentsBitField } = require('discord.js')
const path = require('path')
const fs = require('fs')
global.DATA = "DATA.json"
global.DATA_CONFIG = "DATA_CONFIG.json"

const allIntents = new IntentsBitField(7796);
global.client = new Client({ intents: allIntents })

//CommandHandler
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command)
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)

    console.log(event)
    
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
		
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

start()

async function start(){
    await client.login(process.env.TOKEN);
    
    const dataUtil = require("./utils/data.js")
    await dataUtil.save()
}
