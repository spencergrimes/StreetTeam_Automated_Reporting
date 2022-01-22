// copied and pasted an App Script I created a while ago to track our Modern Musician metrics...thought it might be a helpful starting place!

function doPost(request) {
  return updateMetrics(request);
}

function updateMetrics(request) {

  var selectedMetric = request.parameter.metric;

  /*  //TESTING GROUND
  
  function testScript() {
  var selectedMetric = "TourHackingLead"
  
  */

  //GET DATE

  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  var monthMetrics = mm + '/' + yyyy;

  var spreadsheetId = '1UfRFM7Uz0YUqemPTVYe1lmZ5NC5v9naFvmlLvXPZuVM';
  var rangeName = monthMetrics + '!A2:I35';

  var stringSheet = JSON.stringify(monthMetrics);
  var stringToday = JSON.stringify(today)

  var metricsSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(monthMetrics)

  // GET METRICS COLUMN NUMBER

  function getColumnNrByName(sheet, metric) {
    var range = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
    var values = range.getValues();

    for (var row in values) {
      for (var col in values[row]) {
        if (values[row][col] == metric) {
          return parseInt(col);
        }
      }
    }

    throw 'failed to get column by name';
  }

  var metricColumn = getColumnNrByName(metricsSheet, selectedMetric)

  // GET PREVIOUS METRICS AMOUNT

  function getPreviousAmount(sheet, column, metric, date, metriccolumn) {

    var lastRow = sheet.getLastRow();
    var data = sheet.getRange(1, column, lastRow, column + metric).getValues();


    for (i = 0; i < data.length; ++i) {
      if (data[i][0] == date) {
        return data[i][metric];

      }
    }
  }


  var previousAmount = getPreviousAmount(metricsSheet, 1, metricColumn, today, metricColumn)

  // SET NEW METRIC

  function setNewMetric(sheet, column, metric, date, amount) {

    var lastRow = sheet.getLastRow();
    var data = sheet.getRange(1, column, lastRow, column + metric).getValues();


    for (i = 0; i < data.length; ++i) {
      if (data[i][0] == date) {
        return sheet.getRange(i + 1, column + metric).setValue(amount + 1);

      }
    }
  }

  var metricScript = setNewMetric(metricsSheet, 1, metricColumn, today, previousAmount);
  metricScript

  SpreadsheetApp.flush();
}