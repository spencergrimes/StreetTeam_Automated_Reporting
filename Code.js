function doPost(request) {
  var ssId = SpreadsheetApp.getActive().getId()
  return updateMetrics(request, ssId);
}

function setup() {
  var ssId = SpreadsheetApp.getActive().getId()
  var triggers = ScriptApp.getProjectTriggers();
  if (triggers.length == 0) {
    ScriptApp.newTrigger('onOpen')
      .forSpreadsheet(ssId)
      .onOpen()    
      .create();
  }
}

function onOpen(request) {
  SpreadsheetApp.getUi().createMenu("Modern Musician Setup").addItem("Run", "setup").addToUi();

  var ssId = SpreadsheetApp.getActive().getId()
  return updateMetrics(request, ssId);
}

function updateMetrics(request, ssId) {

  // var testData = getTestData();

  var data = fetchDataFromServer();

  if (data.hasOwnProperty("data")) {
    data = data.data;
  }

  var spreadsheetId = ssId;

  var today = new Date();
  var quarter = "Q" + (Math.floor((today.getMonth() + 3) / 3)).toString();

  var metricsSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(quarter)

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var weekName = getWeekName(key)

      var columnNr = getColumnNrByWeekName(metricsSheet, weekName)

      for (var internalKey in data[key]) {
        var rows = translateTitleToRowNumber(internalKey)
        var valueToWrite = data[key][internalKey].toString()
        rows.forEach(element => {
          if (element != "-1") {
            metricsSheet.getRange(Number(element), columnNr + 1).setValue(valueToWrite)
            // console.log(element, columnNr + 1)
          }
        });

      }
    }
  }
}
console.log("done");
SpreadsheetApp.flush();