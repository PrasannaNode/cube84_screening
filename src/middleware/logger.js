require('winston-daily-rotate-file');
var winston = require('winston');
var requestId = guid();
var fileStack = '';

//Generate a random request ID for identification
function guid() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

class CustomLogger {
  constructor() {
    this.logger = null;
    winston.loggers.add('logger', {
      transports: [
        /*new (winston.transports.Console)({
            level: 'info',
            colorize: true
        }),*/

        //new files will be generated each day, the date patter indicates the frequency of creating a file.
        new winston.transports.DailyRotateFile({
          name: 'debug-log',
          filename: 'logs/API-Logger-%DATE%.log',
          prepend: true,
          datePattern: 'YYYY-MM-DD',
          format: winston.format.printf(
            info => `${this.getFormattedDate()} | ${fileStack} | ${requestId} | [${info.level}] | ${info.message}`
          ),
        })
      ]
    });
    this.logger = winston.loggers.get('logger');
  }


  //Get the file name and line number from which the log is called on
}

module.exports = new CustomLogger();
