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

function getWeekName(key) {
    var nameTogether = key.substring(8,);  // assuming the title is "testDataWeekN"

    return nameTogether.slice(0, 4) + ' ' + nameTogether.slice(4);  // adds space between Week and the number
}

function getWeekQuarterYearNumber(dateString) {
    d = new Date(dateString)
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Calculate full quarter
    var quarter = "Q" + (Math.floor((d.getMonth() + 3) / 3)).toString();
    // Calculate week of the quarter
    var weekOfQuarter = (weekNo % 13)
    if (weekOfQuarter == 0){
        weekOfQuarter = 13;
    }
    if (weekNo == 53){
        weekOfQuarter = 14;
    }
    // Return array of year and week number
    return {
        year: d.getUTCFullYear().toString(),
        quarter: quarter.toString(),
        weekOfQuarter: weekOfQuarter.toString(),
        weekNo: weekNo.toString()
    };
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

function fetchDataFromServer(api_key) {
    var url = "http://dev.modern-musician.link/get-summary-data?api_key=" + api_key + "&service=FUNNEL_ACCELERATOR";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var response = UrlFetchApp.fetch(url, requestOptions);

    var responseCode = response.getResponseCode()
    var responseBody = response.getContentText()

    if (responseCode === 200) {
        var responseJson = JSON.parse(responseBody)
        return responseJson;
    } else {
        Logger.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody))
    }
}

function translateTitleToRowNumber(name) {  // TODO: Find this automatically
    switch (name) {
        case 'date_range_end':
            return ["2"]
        case 'conversations_started':
            return ["11", "16"]
        case 'songs_clicked':
            return ["18"]
        case 'songs_listened':
            return ["20"]
        case 'songs_enjoyed':
            return ["22"]
        case 'new_fans_subscribed':
            return ["24"]
        case 'total_fans_subscribed':
            return ["28"]
        case 'fans_engaged':  // TODO: Check this here Engaged == Activated? 
            return ["30"]
        case 'shows_registered':
            return ["32", "36"]
        case 'shows_attended':
            return ["38"]
        case 'calls_booked':
            return ["40", "44"]
        case 'calls_completed':
            return ["46"]
        case 'budget_spent':
            return ["5"]
        case 'currency':  // TODO: Where is the currency? 
            return ["-1"]
        case 'impressions':
            return ["7"]
        case 'link_clicks':
            return ["9"]
        case 'ticket_revenue':
            return ["52"]
        case 'starter_packs_purchased':
            return ["53"]
        case 'vip_bundles_purchased':
            return ["54"]
        case 'inner_circle_purchased':
            return ["55"]
        case 'diamond_purchased':
            return ["48", "56"]
        default:
            return ["-1"]
    }
}