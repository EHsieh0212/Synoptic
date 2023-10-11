const {dbSqlCommand} = require('../db/database');
const jwtdecode = require('jwt-decode');

// validate registration infos
const validateRegister = async(req, res, next) => {
    try{
        // username cannot be duplicated
        let checkname = `SELECT * FROM user WHERE user_name = ?`;
        let name = [req.body.userName];
        const checkResult = await dbSqlCommand(checkname, name);
        if (checkResult[0].length != 0){
            return res.status(400).send({
                msg: 'This username is already in use!'
              });
        }
        // username min length 3
        if (!req.body.userName || req.body.userName.length < 3) {
            return res.status(400).send({
              msg: 'Please enter a username with min. 3 chars'
            });
        }
        // password min 5 chars
        if (!req.body.userPassword || req.body.userPassword.length < 5) {
            return res.status(400).send({
              msg: 'Please enter a password with min. 5 chars'
            });
        }
        // userEmail cannot be duplicated
        let checkemail = `SELECT * FROM user WHERE user_email = ?`;
        let email = [req.body.userEmail];
        const checkResult2 = await dbSqlCommand(checkemail, email);
        if (checkResult2[0].length != 0){
            return res.status(400).send({
                msg: 'This user email is already in use!'
              });
        }
        // userEmail must contain "@"
        if (!req.body.userEmail || !req.body.userEmail.includes('@')) {
          return res.status(400).send({
            msg: 'Please enter a valid user email'
          });
      }
      next();
    } catch(error){
      return res.status(400).send({
        // normally comes in db query error
        msg: error.message
      });
    }
    
};


// validate jwt & store jwt parsed data in req.jwtEncodedInfo
const IsLoggedIn = async(req, res, next) => {
  try{
    // parse jwt infos:
    const decodedInfo = await jwtdecode(req.header('Authorization'))
      // this is the test jwt, it can last for 7 days
      // const decodedInfo = await jwtdecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0N2ZjYjZlLTA2NGEtNGYyMy04ZWYwLWRmZjc0NTExOGNiYyIsIm5hbWUiOiJlbGFpbmV0cnl5eTEyMzQ1IiwiZW1haWwiOiJlZWU2NzEyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDJkTTBYRmdFMFA4aGJXdzc4M0pCbE9jR2ZDa1ppdm0wZG90c1FDR092UW1rdmVGQWVINGh5IiwiaWF0IjoxNjY1ODU2NTY3LCJleHAiOjE2NjY0NjEzNjd9.urOg7pDQRbHVCpipA6Vl-5Q8lGimiwentkEnXbvDii4")
    // store jwt infos to req.user
    req.jwtEncodedInfo = decodedInfo;
    // store jwt token to user table
    next();
  } catch(error) {
    return res.status(400).send({
      msg: error.message
    })
  }
}


module.exports = {
    validateRegister, 
    IsLoggedIn
};