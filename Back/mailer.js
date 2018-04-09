var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'potiron.emailing@gmail.com',
        pass: 'canardAdmin'
    }
});

function sendMailWithToken(userEmailAdress, guidToken, host) {
    var mailOptions = {
        from: 'potiron.emailing@gmail.com',
        to: userEmailAdress,
        subject: 'Bienvenue sur potiron.alwaysdata.net !',
        text: "Toute l'équipe vous souhaite la bienvenue sur potiron.alwaysdata.net. N'hésitez pas à envoyer des feedsback sur cette adresse. Zoubab." + 
            "Veuillez cliquer sur ce lien pour activer votre compte : http://" + host + "/api/users/activateAccount?guidToken=" + guidToken
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);            
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMailWithToken
}