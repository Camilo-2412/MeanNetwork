const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async(req,res) =>{
    if(!req.body.name || !req.body.email ||!req.body.password) return res.status(400).send("Incomplete Data");

    let existingEmail = await User.findOne({email: req.body.email});
    if(existingEmail) return res.status(400).send("Email already register");

    let hash = await bcrypt.hash(req.body.password, 10);

    let user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hash,
        dbStatus: true,
    });

    let result = await user.save();
    if(!result) return res.status(400).send("Failed to register user");

    try {
        let jwtToken = user.generateJWT();
        return res.status(200).send({jwtToken});
    } catch (e) {
        return res.status(400).send("Failed to register user")
    }
};

const login= async(req,res) =>{
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Incorrect email or password");

    const hash = await bcrypt.compare(req.body.password , user.password);
    if(!hash) return res.status(400).send("Incorrect email or password");

    try {
        const jwtToken = user.generateJWT();
        return res.status(200).send({jwtToken});
    } catch (e) {
        return res.status(400).send("login error");
    }
};

module.exports = {registerUser, login };
