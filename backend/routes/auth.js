const router = require("express").Router();
const { User } = require("../model/user");


router.post("/", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        const upass = await User.findOne({ password: req.body.password });
        if (!user && !upass) {
            return res.status(401).send({ message: "Invalid Email or Password" });

        } else if (user && !upass) {
            const updateduser = await User.findByIdAndUpdate(user._id, { $inc: { "incorrect": 1 } }
            );
            res.status(200).send({ data: updateduser, message: "password incorrect" })
        } else if (upass && !user) {
            const updateduser = await User.findByIdAndUpdate(upass._id, { $inc: { "incorrect": 1 } }
            );
            res.status(200).send({ data: updateduser, message: "email incorrect" })
        }
        else if (user && upass && user.incorrect <= 10) {
            const token = user.generateAuthToken();
            const updateduser = await User.findByIdAndUpdate(user._id, {
                "incorrect": 0
            });
            console.log(updateduser)
            //localStorage.setItem("user",JSON.stringify({user}))
            res.status(200).send({ tdata: token,udata:user.email , message: "Logged in successsfully" })
        } else {
            res.status(200).send({ message: "Login after 24 hours" })
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;