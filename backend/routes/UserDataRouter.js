const express = require("express");
const userData = require("../models/userData")
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT_SECRET = "thisismysamplejwtsecreticankeeepitaslargeasiwantanythingicanwritehereS"
const jwt = require("jsonwebtoken");



router.post("/register", async (req, res) => {
    try {


        const { name, username, email, mobileNo, password, bio, role } = req.body;


        if (!name || !username || !email || !mobileNo || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const existingUser = await userData.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            return res.status(400).json({ error: "user already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userData({
            name,
            username,
            email,
            mobileNo,
            password: hashedPassword,
            bio,
            role
        })

        await newUser.save();

        res.status(201).json({ message: "user registered!!" })
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }
})

router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "email" })
        }

        const user = await userData.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "used doesnt exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "incorrect password" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie('token', token, {httpOnly:true,maxAge:360000});
        res.json({ token, userId: user._id });
    } catch (err) {
        return res.status(500).json({ err: `${err}` })
    }

})
module.exports = router;