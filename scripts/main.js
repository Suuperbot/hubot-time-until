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
//   hubot <how many days until MM/dd/yyyy> - <X days until MM/dd/yyyy>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   <adamsdropbox>
var moment = require('moment');
module.exports = function (robot) {

  robot.respond(/how many days until (.+)(\?*)/i, function (res) {
    var now = moment();
    var query = moment(res.match[1]);
    if (query.isValid()){
      var duration = now.to(query, true);
      res.reply(duration + ' until '+ query.format('MMM DD, YYYY'));
    } else {
      res.reply('Are you sure that\'s a real date?');
    }
  });

};
