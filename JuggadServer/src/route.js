/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = (app, mssql) => {
    app.get('/' , function(req, res) {

            // send the main (and unique) page
        res.setHeader('Content-Type', 'text/html');
        res.sendFile( __dirname + '/views' + '/login.html');
    });

    app.post('/login', function(req, res) {
        let username = req.body.username;
        let password = req.body.password; 
        
        let sql = 'SELECT l.UID AS userId, l.Name AS name, l.Mobile AS mobile, l.Password AS password FROM tblLogins l WHERE l.Mobile = '+username+' AND l.Password = '+password;
        
        let callBackFunctionLogin = (err, selectedUser) =>{
            if (err) {
                return res.json({user:selectedUser}).status(400);
            };
            res.json({user:selectedUser});
        };
        mssql.query(sql, callBackFunctionLogin);
    });
    
    // registration for a new user 
    app.post('/registration', function(req, res) {
        
		let name = (req.body.name);
		let password = (req.body.password);
		let email = (req.body.email);
		let mobile = (req.body.mobile);
        let sql_registration = "INSERT INTO tblLogins (Name,Password,Email,Mobile) VALUES ('"+name+"','"+password+"','"+email+"','"+mobile+"')";
                
        let RegistrationInsert =  (err, result)=> {
			if (err) throw err; 
			res.json({name:name, email:email, mobile:mobile});
		};
		mssql.query(sql_registration, RegistrationInsert);
	});

    // Insert a new booking in green zone
    app.get('/bookingSelectZone', function (req, res) {
		let sql_z = "SELECT DISTINCT ZID, Floor RoomNo, Zone, Capacity FROM tblZones ";
		let Listzone = function (err, zones) {
			if (err) throw err;
			res.json(zones);
		};
		mssql.query(sql_z, Listzone);
    });
    
    app.get('/bookingSelectDateTime',function(req,res){
        
        let UID = (req.query.UID);
        let ZID = (req.query.ZID);
        let date = new Date (req.query.date);
        let starttime = new Date (req.query.starttime);
        let endtime = new Date (req.query.endtime);
        let cost = (req.query.cost);
     
        let sql_nb = 'INSERT INTO tblBookings (UID,ZID,ZIDdate,starttime,endtime,cost) VALUES (?,?,?,?,?,?)';
		let values = [UID,ZID,date,starttime.toLocaleTimeString('fr-FR', { hour12: false,timeZone:'UTC'}),endtime.toLocaleTimeString('fr-FR', { hour12: false,timeZone:'UTC'}),cost];
		
		let NewBookingInsert =  function (err, result) {
			if (err) throw err; 
			res.json({UId:UId,ZId:ZId,date:date,starttime:starttime.toLocaleTimeString('fr-FR', { hour12: false,timeZone:'UTC' }),endtime:endtime.toLocaleTimeString('fr-FR', { hour12: false,timeZone:'UTC' }),cost:cost});
		};
		mssql.query(sql_nb, values, NewBookingInsert);

    });


}




