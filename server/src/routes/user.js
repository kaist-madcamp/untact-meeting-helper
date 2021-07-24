const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

// 192.249.18.120

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
    });
});

router.post("/join", (req, res) => {
    console.log('/user/join')
    console.log(req.body)
    const user = new User(req.body);

    user.save((error, doc) => {
        if (error) return res.json({ ok: false, erroror });
        return res.status(200).json({
            ok: true
        });
    });
});


router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (!user)
            return res.json({
                ok: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch)
                return res.json({ ok: false, message: "Wrong password" });

            user.generateToken((error, user) => {
                if (error) return res.status(400).send(error);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        ok: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (error, doc) => {
        if (error) return res.json({ ok: false, error });
        return res.status(200).send({
            ok: true
        });
    });
});

router.post("/getUsers", (req, res) => {

    User.find()
        .exec((error, users) => {
            if (error) return res.status(400).json({ ok: false })
            return res.status(200).json({ ok: true, users })
        })

});

router.post("/user_by_id", (req, res) => {
    console.log('user_by_id')
    let userId = req.body.userId
    console.log(userId)
    //we need to find the product information that belong to product Id 
    User.findOne({ "_id": userId })
        .exec((error, user) => {
            console.log("in func    " + user)
            if (error) return res.status(400).send(error)
            return res.status(200).json({ ok: true, user })
        })
});



router.put("/update", async (req, res) => {

    console.log("/user/update");
    let filter = {
        "_id": req.body.userId
    };

    const prettyPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(prettyPassword, 10);

    let update = {
        "name": req.body.name,
        "password": hashedPassword,
        "image": req.body.image,
    };

    User.findOneAndUpdate(
        filter,
        update,
        {
            new: true
        },
        (error, user) => {
            console.log('user/update')
            console.log(user)
            if (error) return res.status(400).send(error)
                return res.status(200).json({ok: true, user})
        }
    )
});

module.exports = router;