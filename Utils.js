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

function translateTitleToRowNumber(name) {  // TODO: Find this automatically
    switch (name) {
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