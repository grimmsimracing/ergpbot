const Discord = require('discord.js');
const axios = require('axios');
const config = require('dotenv').config();
const prefix = '!';
const client = new Discord.Client();
var globalEventID = '';

client.once('ready', () => {
    console.log('bot is ready');
});

client.on('message', (msg) => {

    const driver_username = msg.member.user.username+"#"+msg.member.user.discriminator;
    if(!msg.content.startsWith(prefix)) return
    const channelID = msg.channel.topic;
    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if(command === 'entrylist'){
        msg.channel.send("**Loading list, please wait...**");
        setTimeout(function(){
            //msg.channel.send(channelID);
            axios.get('https://ergp.axlemotorsport.com/race/assets/functions/discordBot.php', {
                params: {
                action: 'entryList',
                eventID:channelID
                }
            }).then(function (response) {
                msg.channel.bulkDelete(50);
                msg.channel.send(response.data.entrylist,{split:true});
            });
        },3000);
    }  

    else if(command === 'checkin'){
        globalEventID = channelID   
        if(channelID){
        axios.get('http://ergp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
                action: 'checkin',
                discordID: driver_username,
                eventID:channelID
            }
        }).then(function (response) {
            msg.channel.send("!process");
        }).catch(function (error) {
            console.log(error);
          }); 
        }
    } 
    
    else if(command === 'checkout'){
        globalEventID = channelID   
        if(channelID){
        axios.get('http://ergp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
                action: 'checkout',
                discordID: driver_username,
                eventID:channelID
            }
        }).then(function (response) {
            msg.channel.send("!process");
        }).catch(function (error) {
            console.log(error);
          }); 
        }
    } 

    else if(command === 'process'){
        msg.channel.bulkDelete(50);
        msg.channel.send('!entrylist'); 
    }


  });


client.login(process.env.BOT_TOKEN);



