const router = require("express").Router();
const { User } = require("../model/user");

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User With given email alredy exist" });
        }

        await new User({ ...req.body, password: req.body.password }).save();
        res.status(201).send({ message: "User created successfully" })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
module.exports = router;