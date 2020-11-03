/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = (app, mssql) => {
  app.get("/", function (req, res) {
    // send the main (and unique) page
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/views" + "/login.html");
  });

  app.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let sql =
      "SELECT l.UID AS userId, l.Name AS name, l.Mobile AS mobile, l.Password AS password FROM tblLogins l WHERE l.Mobile = '" +
      username +
      "' AND l.Password = '" +
      password+"';";

    let callBackFunctionLogin = (err, selectedUser) => {
      if (err) {
        return res.json({ user: selectedUser }).status(400);
      }
      res.json({ user: selectedUser });
    };
    mssql.query(sql, callBackFunctionLogin);
  });

  // registration for a new user
  app.post("/registration", function (req, res) {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let sql_registration =
      "INSERT INTO tblLogins (Name,Password,Email,Mobile) VALUES ('" +
      name +
      "','" +
      password +
      "','" +
      email +
      "','" +
      mobile +
      "')";

    let RegistrationInsert = (err, result) => {
      if (err) throw err;
      res.json({ name: name, email: email, mobile: mobile });
    };
    mssql.query(sql_registration, RegistrationInsert);
  });


  app.get("/getGZIds", function (req, res) {

    let sql_greenZoneIds =
      "SELECT z.ZID AS zoneId FROM tblZones z WHERE z.Zone = 'GZ';";

    let callBackFunctionLogin = (err, greenZoneIds) => {
      if (err) {
        return res.json({ GZIds: greenZoneIds }).status(400);
      }
      res.json({ GZIds: greenZoneIds });
    };
    mssql.query(sql_greenZoneIds, callBackFunctionLogin);
  });

  app.get("/getRZIds", function (req, res) {

    let sql_regZoneIds =
      "SELECT z.ZID AS zoneId FROM tblZones z WHERE z.Zone = 'RZ';";

    let callBackFunctionLogin = (err, regZoneIds) => {
      if (err) {
        return res.json({ RZIds: regZoneIds }).status(400);
      }
      res.json({ RZIds: regZoneIds });
    };
    mssql.query(sql_regZoneIds, callBackFunctionLogin);
  });

  app.post("/saveBooking", function (req, res) {
    
    console.log("inside savebooking route");
   
    let zid = req.body.zoneId;
    let UID = req.body.UID;
    let date =req.body.date;
    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    let cost = req.body.cost;
    let persons = 1;
    let action = "Act";
    let bookingPoints = 10;
   
    let sql_nb ="INSERT INTO tblBookings (UID,ZID,Date,StartTime,EndTime,cost,Persons,ActOrMoved) VALUES ('" +UID +
    "','" +zid +"','" +date +"','" +starttime+"','" +endtime+"','" +cost +"','" +persons +"','" +action +"')";

    let NewBookingInsert = function (err, result) {
      if (err) throw err;
      let sql_savePoints = "INSERT INTO tblCredits (UID, CrOrDb, Total, ForWhat, ReffID) VALUES('"+UID+"', '"+bookingPoints+"', (SELECT TOP 1 Total FROM tblCredits WHERE UID = '"+UID+"' ORDER BY CID DESC)+'"+bookingPoints+"', 'BID', 1)"
      let NewBookingInsert = function (err, result) {
        if (err) throw err;
        res.json({UId: UID,ZId: zid,date: date,starttime: starttime,endtime: endtime,cost: cost});
        };
      mssql.query(sql_savePoints, NewBookingInsert);
    };
    mssql.query(sql_nb, NewBookingInsert);
  });


  app.get("/getPricePerHourOfSelectedZone", function (req, res) {
    let date = req.query.date;
    let selectedZone = req.query.selectedZone;
    let startTime = req.query.startTime;
    let endTime = req.query.endTime;
    console.log(date, selectedZone, startTime, endTime);
    res.json({ price: 7 }); 
  });

  app.get('/userTrefels', function (req, res) {
    let UID = req.query.UID;

    let sql_trefels = "SELECT TOP 1 Total FROM tblCredits WHERE UID = '"+UID+"' ORDER BY CID DESC ";

    let CurrentTrefels = function (err, points) {
        if (err) throw err;
        res.json({point:points});
    };
    mssql.query(sql_trefels, CurrentTrefels);
});


app.get("/getPriceOfTheDay", function (req, res) {
  let date  = req.query.date; // to be used when we call alg
  let sql_DatPriceCallBack ="select sum((EndTime-StartTime)*Persons) AS occ from tblbookings where date like '"+date+"';";
  let price;
  let DatOccupancyCallBack = function (err, occupancy) {
    if(occupancy && occupancy.recordset[0].occ !== null){
      occupancyPercentage = (occupancy.recordset[0].occ/360)*100; // to be used when we call alg
      //Python Alg CALL : inputs - date, ocupancy
      price = 8
    }else{
      price = 0
    }
    res.json({ price: price }); //need to be removed when api comes
  };
  mssql.query(sql_DatPriceCallBack, DatOccupancyCallBack);
});

app.get("/getPriceOfTheHour", function (req, res) {
  let date  = req.query.date; // to be used when we call alg
  let startTime  = req.query.startTime;
  console.log(date+":"+startTime);

  let sql_DatPriceCallBack ="select sum((EndTime-StartTime)*Persons) AS occ from tblbookings where date like '"+date+"' and starttime = '"+startTime+"';";
  console.log(sql_DatPriceCallBack);
  let DatOccupancyCallBack = function (err, occupancy) {
    if(occupancy && occupancy.recordset[0].occ !== null){
      occupancyPercentage = (occupancy.recordset[0].occ/360)*100; // to be used when we call alg
      console.log(occupancyPercentage);

      //Same python call: date , occupancy
      price = 3
    }else{
      price = 0
    }
    res.json({ price: price }); //need to be removed when api comes

  };
  mssql.query(sql_DatPriceCallBack, DatOccupancyCallBack);
});



/*
app.get('/homeViewBookingToday', function (req, res) {
        
  var Date = (req.query.Date);

  let sql_vbt = "SELECT b.* ,z.RoomNo FROM tblBookings b,tblZones z WHERE b.Date = '"+Date+"'AND b.ZID = z.ZID ";

  let ViewBookingToday = function (err, result) {
      if (err) throw err;
      res.json({ Date: Date});
  };
  mssql.query(sql_vbt, ViewBookingToday);
});
*/

};
