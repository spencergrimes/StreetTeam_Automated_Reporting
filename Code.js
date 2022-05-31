function doPost(request) {
  var ssId = SpreadsheetApp.getActive().getId()
  var active = SpreadsheetApp.getActive()
  return updateMetrics(request, active, ssId);
}

function onOpen(request) {
  SpreadsheetApp.getUi().createMenu("Modern Musician Setup")
    .addItem("Run", "setup")
    .addItem("Update Data", "updateData")
    .addToUi();
}

//renamed onOpen to whenOpen per https://stackoverflow.com/a/62791834
function whenOpen(request) {
  var ssId = SpreadsheetApp.getActive().getId()
  var active = SpreadsheetApp.getActive()
  return updateMetrics(request,active, ssId);
}

function updateMetrics(request,active, ssId) {
  var data = getData(ssId);
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key].hasOwnProperty("date_range_end")) {
        var dateTimeData = getWeekQuarterYearNumber(data[key]["date_range_end"]);
        var metricsSheet = active.getSheetByName(dateTimeData.year + '-' + dateTimeData.quarter);
        var weekName = "Week " + dateTimeData.weekOfQuarter;
        var columnNr = getColumnNrByWeekName(metricsSheet, weekName);

        for (var internalKey in data[key]) {
          var rows = translateTitleToRowNumber(internalKey)
          var valueToWrite = data[key][internalKey].toString()
          rows.forEach(element => {
            if (element != "-1") {
              metricsSheet.getRange(Number(element), columnNr + 1).setValue(valueToWrite)
            }
          });
  
        }

      }
    }
  }
}
console.log("done");
SpreadsheetApp.flush();