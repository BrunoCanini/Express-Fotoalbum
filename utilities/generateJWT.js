const jwt = require('jsonwebtoken');

module.exports = function (user){

    // estraggo i dati non sensibili per creare il token
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }

    //dati da salvare, secredkey, opzioni
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })


}