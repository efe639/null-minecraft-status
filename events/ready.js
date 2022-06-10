const Discord = require("discord.js");
const client = global.client;
const moment = require("moment");
const request = require('request');
const config = require('../config.json')
moment.locale("tr")

exports.execute = async () => {

  var mcIP = config.sunucuIP;
  var mcPort = 25565;
  
  var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
  
  function updateStatus() {
      var status;
      request(url, function(err, response, body) {
          if(err) {
              console.log(err);
              status = 'API error';
          } else {
              body = JSON.parse(body);
              if(body.online) {
                  status = '' + (body.players.now || '0' )  + ' Kişi Sunucuda Oynuyor ';
              } else {
                  status = 'offline';
              }
          }
          client.user.setActivity(`${status}`, {type: "LISTENING"});
      });
  }
  client.user.setStatus("idle");
  setInterval(() => {
    updateStatus();
}, 50000);

};

exports.conf = {
  event: "ready"
};