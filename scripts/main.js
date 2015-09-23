// Description:
//   Get the number of days until a date
//
// Dependencies:
//   "moment": "2.10.6"
//
// Commands:
//   hubot show custom dates - Display saved dates from brain
//   hubot how long until <MM/DD/YYYY> - Calculate time until specified date
//   hubot how long until <MM/DD/YYYY> --save <EventName> - Calculate time until specified date and save <EventName>
//   hubut how long until <EventName> - Calculate time until specified <EventName>
//
// Author:
//   adamsdropbox
var moment = require('moment');
module.exports = function (robot) {

  function namespace(key){
    return 'hubot-time-until-'+ key;
  }

  var dateFormat = 'MM/DD/YYYY';

  var customEvents = robot.brain.get(namespace('events')) || {};

  // Query a date
  robot.respond(/how long until ([0-1][0-9][\-|\/][0-3][0-9][\-|\/][0-9]{4})[\?|\s]*(--save \w+)*/i, function (res) {
    var query = res.match[1];
    var save = res.match[2];

    var date = moment(query, dateFormat);

    // Custom Event?
    res.reply('q: '+ query +'; s: '+ save);
    if (date.isValid()){
      var duration = date.toNow(true);
      res.reply(duration + ' until '+ date.format('MMM DD, YYYY'));

      // Save Event?
      var saveName = save.split('--save ')[1];
      if (saveName){
        customEvents[saveName.toLowerCase()] = date;
        robot.brain.set(namespace('events'), customEvents);
      }
    } else {
      res.reply('Are you sure that\'s a real date?');
    }
  });

  // Query an event by name
  robot.respond(/how long until ([a-z]+)+\?*/i, function (res) {
    var query = res.match[1];

    if (customEvents[query.toLowerCase()] != undefined){
      var date = customEvents[query.toLowerCase()];
      var duration = date.toNow(true);
      res.reply(duration + ' until '+ date.format('MMM DD, YYYY'));
    } else {
      res.reply('Custom event not found.');
    }
  });

  robot.respond(/show custom dates/i, function (res) {
    var events = robot.brain.get(namespace('events'));
    if (events){
      res.reply(JSON.stringify(events));
    } else {
      res.reply('No custom events saved. Add one with "hubot how long until <'+ dateFormat +'> --save <event name>"');
    }
  });

};
