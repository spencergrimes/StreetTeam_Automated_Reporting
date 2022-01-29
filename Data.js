function getData(ssId) {
  var api_key = SpreadsheetApp.openById(ssId).getSheetByName("Setup").getRange(1, 2).getValue();

  var data = fetchDataFromServer(api_key);

  if (data.hasOwnProperty("data")) {    
    return data.data;
  }
  return {}
}

function getTestData() {
    return {
      "testDataWeek1": {
        "date_range_start": "2022-01-09",
        "date_range_end": "2022-01-15",
        "conversations_started": 243,
        "songs_clicked": 175,
        "songs_listened": 140,
        "songs_enjoyed": 109,
        "new_fans_subscribed": 55,
        "total_fans_subscribed": 443,
        "fans_engaged": 164,
        "shows_registered": 41,
        "shows_attended": 10,
        "calls_booked": 5,
        "calls_completed": 4,
        "budget_spent": 175,
        "currency": "USD",
        "impressions": 12580,
        "link_clicks": 453,
        "ticket_revenue": 45,
        "starter_packs_purchased": 5,
        "vip_bundles_purchased": 2,
        "inner_circle_purchased": 1,
        "diamond_purchased": 0
      },
      "testDataWeek2": {
        "date_range_start": "2022-01-16",
        "date_range_end": "2022-01-22",
        "conversations_started": 268,
        "songs_clicked": 183,
        "songs_listened": 150,
        "songs_enjoyed": 118,
        "new_fans_subscribed": 62,
        "total_fans_subscribed": 483,
        "fans_engaged": 177,
        "shows_registered": 49,
        "shows_attended": 15,
        "calls_booked": 6,
        "calls_completed": 3,
        "budget_spent": 175,
        "currency": "USD",
        "impressions": 12580,
        "link_clicks": 453,
        "ticket_revenue": 45,
        "starter_packs_purchased": 2,
        "vip_bundles_purchased": 0,
        "inner_circle_purchased": 0,
        "diamond_purchased": 1
      },
      "testDataWeek11": {
        "date_range_start": "2022-01-16",
        "date_range_end": "2022-01-22",
        "conversations_started": 268,
        "songs_clicked": 183,
        "songs_listened": 150,
        "songs_enjoyed": 118,
        "new_fans_subscribed": 62,
        "total_fans_subscribed": 483,
        "fans_engaged": 177,
        "shows_registered": 49,
        "shows_attended": 15,
        "calls_booked": 6,
        "calls_completed": 3,
        "budget_spent": 175,
        "currency": "USD",
        "impressions": 12580,
        "link_clicks": 453,
        "ticket_revenue": 45,
        "starter_packs_purchased": 2,
        "vip_bundles_purchased": 0,
        "inner_circle_purchased": 0,
        "diamond_purchased": 1
      }
    }
  }