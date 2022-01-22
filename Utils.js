function getWeekName(key) {
    var nameTogether = key.substring(8,);  // assuming the title is "testDataWeekN"

    return nameTogether.slice(0, 4) + ' ' + nameTogether.slice(4);  // adds space between Week and the number
}

function getColumnNrByWeekName(sheet, name) {
    var range = sheet.getRange(4, 1, 1, sheet.getMaxColumns());
    var values = range.getValues();

    for (var col in values[0]) {  // The week names are in the 4th row
        if (values[0][col] == name) {
            return parseInt(col);
        }
    }


    throw 'failed to get column by name';
}