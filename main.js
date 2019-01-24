const Discord = require('discord.js');
const fs = require("fs");
const token = process.env.token;

const bot = new Discord.Client();
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf-8'));

var prefix = ("/");

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'Il vous voit !'}});
    console.log("Bot is working !");
});

bot.login(token);

bot.on('message', message => {
    if(message.content === "ping"){
        message.reply("pong")
        console.log('ping pong');
    }
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.lenght).split(" ");

    

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .addField('Commandes du Bot !', " -/help : Affiche les commandes du bot !")
        .setColor('#E22549')
        message.channel.sendEmbed(help_embed);
        console.log("Commande Help demmandée !");
        message.delete("/arme")
    }
    if(message.content === prefix + "arme"){
        var arme_e = new Discord.RichEmbed()
        .addField('Roleplay',message.author.username + " sort son arme ...")
        .setColor('#E22549')
        message.channel.sendEmbed(arme_e)
        console.log(message.author.username + " a sorti son arme")
        message.delete("/arme")
    }
    if(message.content === prefix + "candid"){
        var candid = new Discord.RichEmbed()
        .addField('Demande de participation',"T'as demande a été traité et accepté !")
        .setColor('#E26549')
        message.delete("/arme")
        message.channel.sendEmbed(candid)
        message.author.createDM().then(channel => {
            channel.send("Bienvenue ! n'oublie pas de jouer RP")
            channel.send("https://discord.gg/UBWxshP")
        })
        console.log(message.author.username +"s'est inscrit!")
    }
    if(message.content === prefix + "en"){
        var en = new Discord.RichEmbed()
        .addField("Roleplay",message.author.username + ' est arrivé dans la rue')
        .setColor('#E26549')
        message.channel.sendEmbed(en)
        message.delete("/en")
    }
    var sender = message.author;
    var msg = message.content.toUpperCase();
    var role = message.guild.roles.get(message.author.id)
    if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
    if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err)
    })
    if (message.content === prefix + "stats"){
        message.author.createDM().then(channel => {
            channel.send({embed:{
                title: "Stats",
                color: 0xF1C40F,
                fields:[{
                    name:"Nom - Prénom",
                    value:message.author.username,
                    inline:true
                },
                {
                    name:"Bank",
                    value:userData[sender.id + message.guild.id].money + " Dollars",
                    inline:true
                }]
                
                   
            }})
        })
        
    }
    })
