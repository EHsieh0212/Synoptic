const {Router} = require('express');
const router = Router();
const {validateRegister} = require('../middleware/validate')
const {IsLoggedIn} = require('../middleware/validate')
const bcrpyt = require('bcrypt');
const {dbSqlCommand} = require('../db/database');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');


// user register
router.post('/signUp', validateRegister, async(req, res) => {
    // register valid user info into db
    console.log("dsfadsfasdf")
    const {userName, userEmail, userPassword} = req.body;
    const uid = uuidv4();
    const hashPassword = await bcrpyt.hash(userPassword, 10);
    let insertUser = `INSERT INTO user(user_id, user_name, user_email, user_password, last_login, jwt_token) VALUES(?,?,?,?,?,?)`;
    let insertTarget = [uid, userName, userEmail, hashPassword, 0, "0"];
    console.log("dsfadsfasdf")
    try{
        console.log("dsfdsfasdf")
        await dbSqlCommand(insertUser, insertTarget);
        res.send('Successfully Registered!')
    } catch(error){
        return res.status(400).send({
            // normally comes in db query error
            msg: error.message
          });
    } 
});



// user sign in 
router.post('/signIn', async(req, res) => {
    try{
    const {userEmail, userPassword} = req.body;
    // check if user existed by checking userEmail validity
    let queryName = `SELECT * from user WHERE user_email = ?`;
    const userInfo = await dbSqlCommand(queryName, [userEmail]);
    if (userInfo[0].length == 0){
        res.status(400).send({
            msg: "User Not Found."
        })
    }
    const {user_id, user_name, user_email, user_password} = userInfo[0][0];
    // // check if userPassword valid
    const comparePassword = await bcrpyt.compare(userPassword, user_password);
    if (!comparePassword){
        return res.status(400).send({
            msg: 'Password Incorrect.'
          });
    }
    // assign jwt token and store in user table
    const token = jwt.sign(
        {"id": user_id, "name": user_name, "email": user_email, "password": user_password},
        process.env.TOKEN_SECRET,
        {expiresIn: '7d'}
    );
    let storeJwt = `UPDATE user SET jwt_token = "${token}" WHERE user_id = "${user_id}"`;
    await dbSqlCommand(storeJwt);
    // update loggined time status
    let loginTime = Date.now();
    await dbSqlCommand(`UPDATE user SET last_login = ${loginTime} WHERE user_id = "${user_id}"`);
    // return res.send("success");
    return res.send({
        "user": {user_id, user_name}, 
        "token": token});
    } catch(error){
        return res.status(400).send({
            // normally comes in db query error
            msg: error.message
          });
    }
})


// user profile
router.get('/profile', IsLoggedIn, async(req, res) => {
    try{
        const user = req.user;
        return res.json({
            id: user.userId,
            name: user.userName, 
            email: user.userEmail,
            password: user.userPassword
        });
    } catch(error){
        return res.status(400).send({
            msg: error.message
        })
    }
})



module.exports = router;

