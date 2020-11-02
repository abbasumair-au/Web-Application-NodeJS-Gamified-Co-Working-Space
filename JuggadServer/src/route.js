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




  app.post("/saveBooking", function (req, res) {
    
    console.log("inside savebooking route");
   
    let zid = "";
    let UID = req.body.UID;
    let zoneName = req.body.zoneName;
    let floor = 2;
    let date =req.body.date;
    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    let cost = req.body.cost;
    let action = "Act";
    let bookingPoints = 20;

    console.log(UID +" "+zoneName +" "+date+" "+starttime+" "+endtime+" "+cost+" "+action);
   
    let sql_findZID = "SELECT TOP 1 ZID AS id FROM tblZones WHERE Zone = '" + zoneName+"' AND Floor = " +floor+";";
    console.log("find zid query : "+sql_findZID);
    let callBackFunctionfindZID = (err, zoneId) => {
      if (err) throw err;
      zid = zoneId.recordset[0].id;
      console.log("ZID: "+zid);
      let sql_nb ="INSERT INTO tblBookings (UID,ZID,Date,StartTime,EndTime,cost,ActOrMoved) VALUES ('" +UID +
      "','" +zid +"','" +date +"','" +starttime+"','" +endtime+"','" +cost +"','" +action +"')";
  
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
    };
    mssql.query(sql_findZID, callBackFunctionfindZID);
  });


  app.get("/getPricePerHourOfSelectedZone", function (req, res) {
    //let date = req.query.date;
    //let selectedZone = req.query.selectedZone;
    //let startTime = req.query.startTime;
    //let endTime = req.query.endTime;
    //console.log(date, selectedZone, startTime, endTime);
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
