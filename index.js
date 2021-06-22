const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot =new Discord.Client({disableEveryone: true});
var weather = require('weather-js');
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
const { report } = require("superagent");

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: %",
        "Készítő: Aklime",
        "Ha kellek írj Aklime-nek"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})
bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `${prefix}hello`){
        
        message.channel.send("Szia");
    }

    if(cmd === `${prefix}teszt`){
        let TesztEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setTitle("TesztEmbed!")
        .addField("Irodalom:", "Líra\n Epika\n dráma")
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(message.guild.iconURL())
        .setDescription(`\`${prefix}\``)

     essage.channel.send(TesztEmbed)

  
        
        
        if(cmd === `${prefix}szöveg`){
            let szöveg = args.join("")


            let dumaEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .addField("Szöveg:",szöveg)
        
        message.channel.send(TesztEmbed)
    } else {
        message.reply("írj szöveget!")
    }
}

////////// Moderator //////////


        if(cmd === `${prefix}kick`){
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Ehez nincs jogod")
            let kick_user = message.mentions.members.first();
            if(args[0] && kick_user){

                if(args[1]){

                    let KickEmbed = new Discord.MessageEmbed()
                    .setTitle("Kick:")
                    .setColor("RED")
                    .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slice(1).join(" ")}`)
                    message.channel.send(parancsEmbed);

                    kick_user.kick(args.slice[1].join(""));
       
                }else{
                  let parancsEmbed = new Discord.MessageEmbed()
                  .setTitle("Parancs használata:")
                  .addField(`${prefix}kick <@név> [indok]`)
                  .setColor("BLUE")
                  .setDescription("HIBA: Kérlek adj meg egy indokot!")

        
                message.channel.send(parancsEmbed);
                }

            }else{
                let parancsEmbed = new Discord.MessageEmbed()
                .setTitle("Parancs használata:")
                .addField(`${prefix}kick <@név> [indok]`)
                .setColor("BLUE")
                .setDescription("HIBA: Kérlek említs meg egy embert!")

                message.channel.send(parancsEmbed);
            }
        }

        if(cmd === `${prefix}ban`){
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Ehez nincs jogod")
            let ban_user = message.mentions.members.first();
            if(args[0] && ban_user){

                if(args[1]){

                    let BanEmbed = new Discord.MessageEmbed()
                    .setTitle("BAN:")
                    .setColor("RED")
                    .setDescription(`**Banolta:** ${message.author.tag}\n**Banolva lett:** ${kick_user.user.tag}\n**Ban indoka:** ${args.slice(1).join(" ")}`)
                    message.channel.send(parancsEmbed);

                    ban_user.ban(args.slice[1].join(""));
       
                }else{
                  let parancsEmbed = new Discord.MessageEmbed()
                  .setTitle("Parancs használata:")
                  .addField(`${prefix}ban <@név> [indok]`)
                  .setColor("BLUE")
                  .setDescription("HIBA: Kérlek adj meg egy indokot!")

        
                message.channel.send(parancsEmbed);
                }

            }else{
                let parancsEmbed = new Discord.MessageEmbed()
                .setTitle("Parancs használata:")
                .addField(`${prefix}ban <@név> [indok]`)
                .setColor("BLUE")
                .setDescription("HIBA: Kérlek említs meg egy embert!")

                message.channel.send(parancsEmbed);
            }
        }

if(cmd === `${prefix}report`){
    if(args[0] && message.mentions.members.first() && args[1]){

        message.channel.send("A reportodat sikeresen elküldtük!")

        let report_channel = "855183674918830170";


        let report_embed = new Discord.MessageEmbed()
            .setAuthor(message.mentions.members.first().user.tag + `| REPORTED`)
            .setDescription("Report indoka:" + args.join("").slice(args[0].length))
            .addField("Reportolta:", message.author.tag)
            .setColor("RANDOM")
            .setTimestamp(message.createdAt)
            .setFooter(bot.user.username)

            bot.channels.cache.get(report_channel).send(report_embed)
    }else{
        let he_embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag + `| Használat`)
            .setDescription(`${prefix}report @<Név> <Indok>`)
            .setColor("RANDOM")
            .setTimestamp(message.createdAt)
            .setFooter(bot.user.username)

            message.channel.send(he_embed)

    }
}




       





////////// Fun //////////

        if (cmd === `${prefix}weather`){
            if(args[0]){
                weather.find({search: args.join(""), degreeType: "C"}, function(err, result) {
                    if (err) message.reply(err);

                    if(result.length === 0){
                        message.reply=("Kérlek adj meg egy létező település nevet!")
                        return;
                    }

                    let current = result[0].current;
                    let location = result[0].location

                    let WeatherEmbed = new Discord.MessageEmbed()
                    .setDescription(`**${current.skytext}`)
                    .setAuthor(`Időjárás itt: ${current.observationpoint}`)
                    .setThumbnail(current.imageUrl)
                    .setColor("GREEN")
                    .addField("Időzóna:", `UTC${location.timezone}`, true)
                    .addField("Fokozat típusa:", `${location.degreetype}`, true)
                    .addField("Hőfok", `${current.temperature}°C`, true)
                    .addField("Hőérzet:", `${current.feelslike}°C`, true)
                    .addField("Szél", `${current.winddisplay}`, true)
                    .addField("Páratartalom:", `${current.humidity}%`, true)

                    message.channel.send(WeatherEmbed)


                })

            }else{
                message.reply("Kérlek adj meg egy település nevet!")

            }

        }

        

        if(cmd === `${prefix}meme`){
            const subreddits = ["dankmeme", "meme", "me_irl"]
            const random = subreddits[Math.floor(Math.random() * subreddits.length)]

            const IMG = await randomPuppy(random)
            const MemeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(IMG)
            .setTitle(`Keresési szöveg: ${random}(KATT IDE!)`)
            .setURL(`https://www.reddit.com/r/${random}`)

            message.channel.send(MemeEmbed)
        }
        
        
        
        
       
        
    


    console.log(args);


})

bot.login(procces.env.BOT_TOKEN);
