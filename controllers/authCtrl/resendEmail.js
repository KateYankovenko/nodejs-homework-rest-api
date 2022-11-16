const {User} = require("../../models/users")

const { sendEmail, createVerifyEmail } = require("./sendEmail")

const { Unauthorized } = require('http-errors');

const resendEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw Unauthorized(404)
    }

    if(user.verify) {
        throw Unauthorized(400, "Email already verify")
    }

    const mail = createVerifyEmail(email, user.verificationToken);

    await sendEmail(mail);

    res.json({
        message: "Verify email send"
    })
}

module.exports = resendEmail;