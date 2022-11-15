const {User} = require("../../models/users");

const {RequestError} = require("../../helpers");

const verifyEmail = async(req, res)=> {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user){
        throw RequestError(404, "User not found")
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});

    res.json({
        message: "Verify success"
    })
}

module.exports = verifyEmail;