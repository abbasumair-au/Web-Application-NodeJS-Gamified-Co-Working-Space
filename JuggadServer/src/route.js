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
}




