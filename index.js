const Discord = require('discord.js');
const axios = require('axios');
const config = require('dotenv').config();
const prefix = '!';
const client = new Discord.Client();
var globalEventID = '';

client.on('ready', () => {
    console.log('Logged in...');
});

client.on('message', (msg) => {

    const driver_username = msg.member.user.username+"#"+msg.member.user.discriminator;
    //if(msg.author.bot) return
    if(!msg.content.startsWith(prefix)) return
    const channelID = msg.channel.topic;
    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if(command === 'entrylist'){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'entryList',
              eventID:channelID
            }
        }).then(function (response) {
            msg.channel.send(response.data.entrylist,{split:true});
        }).catch(function (error) {
            console.log(error);
        }); 
    }
    
    else if(command === 'gebronze'){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'entryListBronze',
              eventID:channelID
            }
        }).then(function (response) {
            msg.channel.send(response.data.entrylist,{split:true});
        }).catch(function (error) {
            console.log(error);
        }); 
    }

    else if(command === 'checkin'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'checkin',
              discordID: driver_username,
              eventID:channelID
            }
        }).then(function (response) {
            //msg.channel.send(response.data.message);
            //setTimeout(function(){ 
            //    msg.channel.send("!delete");
           //},5000); //time in milliseconds
            msg.channel.send("!delete");
            console.log("ok");
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }
    
    else if(command === 'checkout'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'checkout',
              discordID: driver_username,
              eventID:channelID
            }
        }).then(function (response) {
            //msg.channel.send(response.data.message);
            //setTimeout(function(){ 
            //    msg.channel.send("!delete");
           //},5000); //time in milliseconds
            msg.channel.send("!delete");
            console.log("ok");
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }

    else if(command === 'points'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'pointstable',
              discordID: driver_username,
              eventID:channelID
            }
        }).then(function (response) {
            msg.channel.send(response.data.message,{split:true});
            console.log("ok");
            //setTimeout(function(){ 
                //msg.channel.send("!delete");
           //},5000); //time in milliseconds
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }
    
    else if(command === 'pointspro'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'pointstableCategory',
              discordID: driver_username,
              eventID:channelID,
              category:'2'
            }
        }).then(function (response) {
            msg.channel.send(response.data.message,{split:true});
            console.log("ok");
            //setTimeout(function(){ 
                //msg.channel.send("!delete");
           //},5000); //time in milliseconds
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }
    
    else if(command === 'pointsproam'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'pointstableCategory',
              discordID: driver_username,
              eventID:channelID,
              category:'1'
            }
        }).then(function (response) {
            msg.channel.send(response.data.message,{split:true});
            console.log("ok");
            //setTimeout(function(){ 
                //msg.channel.send("!delete");
           //},5000); //time in milliseconds
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }
    
    else if(command === 'pointsam'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'pointstableCategory',
              discordID: driver_username,
              eventID:channelID,
              category:'0'
            }
        }).then(function (response) {
            msg.channel.send(response.data.message,{split:true});
            console.log("ok");
            //setTimeout(function(){ 
                //msg.channel.send("!delete");
           //},5000); //time in milliseconds
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }
    
    else if(command === 'teamregistration'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'teamRegistration',
              discordID: driver_username,
              leagueID:channelID
            }
        }).then(function (response) {
            msg.channel.send(response.data.message,{split:true});
            console.log("ok");
            //setTimeout(function(){ 
                //msg.channel.send("!delete");
           //},5000); //time in milliseconds
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }

    else if(command === 'delete'){
        msg.channel.messages.fetch({limit:10}).then(messages =>{
            msg.channel.bulkDelete(messages);
            //msg.channel.send("!entrylist "+channelID);
            msg.channel.send("!entrylist");
        });
    }
    
    else if(command === 'listdrivers'){
        globalEventID = channelID
        if(channelID){
        axios.get('https://eracinggp.axlemotorsport.com/race/assets/functions/discordBot.php', {
            params: {
              action: 'listDrivers',
              leagueID:channelID
            }
        }).then(function (response) {
            msg.channel.send(response.data.message,{split:true});
            console.log("ok");
            //setTimeout(function(){ 
                //msg.channel.send("!delete");
           //},5000); //time in milliseconds
        }).catch(function (error) {
            console.log(error);
          }); 
        }//end of if eventID
    }

    
  });

client.login(process.env.BOT_TOKEN);



