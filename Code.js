function doPost(request) {
  return updateMetrics(request);
}

function updateMetrics(request) {

  var testData = getTestData()  // TODO: Get this from a real API 

  var spreadsheetId = '1AThatRnD7CJvuNGof5KpwTngPL3Nsq_p_p5Byg0W6Yk';  // Get this from a real API

  var today = new Date();
  var quarter = "Q" + (Math.floor((today.getMonth() + 3) / 3)).toString();

  var metricsSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(quarter)

  for (var key in testData) {
    if (testData.hasOwnProperty(key)) {
      var weekName = getWeekName(key)

      var columnNr = getColumnNrByWeekName(metricsSheet, weekName)

      for (var internalKey in testData[key]) {
        var rows = translateTitleToRowNumber(internalKey)
        var valueToWrite = testData[key][internalKey].toString()
        rows.forEach(element => {
          if (element != "-1") {
            metricsSheet.getRange(Number(element), columnNr + 1).setValue(valueToWrite)
            console.log(element, columnNr + 1)
          }
        });

      }
    }
  }
}

SpreadsheetApp.flush();