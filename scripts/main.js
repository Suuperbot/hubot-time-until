// Description:
//   Get the number of days until a date
//
// Dependencies:
//   "<moment>": "<2.10.6>"
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot how long until <date> - X days until <date>
//   hubot show custom dates
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   <adamsdropbox>
var moment = require('moment');
module.exports = function (robot) {

  var customEvents = {
    'adams wedding': moment('09/05/2015'),
    'slalom holiday party': moment('12/12/2015')
  };

  robot.respond(/how long until (.+)(\?*)/i, function (res) {
    var query = res.match[1];

    var date = moment();
    if (customEvents[query.toLowerCase()] != undefined){
      date = customEvents[query.toLowerCase()];
    }
    if (date.isValid()){
      var duration = date.toNow(true);
      res.reply(duration + ' until '+ date.format('MMM DD, YYYY'));
    } else {
      res.reply('Are you sure that\'s a real date?');
    }
  });

  robot.respond(/show custom dates/i, function (res) {
    res.reply(JSON.stringify(customEvents));
  });

};
