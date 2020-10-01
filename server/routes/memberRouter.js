const express = require("express");
const router = express.Router();
const User = require("../models/user");
const crypto = require("crypto");

//회원가입
router.post("/join", async(req, res) => {
    try {
        let obj = {
            email: req.body.email
        };

        let user = await User.findOne(obj);
        console.log(user);

        if (user) {
            res.json({
                message: "Please enter a new email ",
                dupYn: "1"
            });
        } else {
            crypto.randomBytes(64, (err, buf) => {
                if (err) {
                    console.log(err);
                } else {
                    crypto.pbkdf2(
                        req.body.password,
                        buf.toString("base64"),
                        102836,
                        64,
                        "sha512",
                        async(err, key) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(key.toString("base64"));
                                buf.toString("base64");
                                obj = {
                                    email: req.body.email,
                                    name: req.body.name,
                                    password: key.toString("base64"),
                                    salt: buf.toString("base64")
                                };
                                user = new User(obj);
                                await user.save();
                                res.json({
                                    message: "You are now a member!",
                                    dupYn: "0"
                                });
                            }
                        }
                    );
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});


router.post("/login", async(req, res) => {
    try {
        await User.findOne({
            email: req.body.email
        }, async(err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
                if (user) {
                    console.log(req.body.password);
                    console.log(user);
                    console.log(user.salt);
                    crypto.pbkdf2(
                        req.body.password,
                        user.salt,
                        102836,
                        64,
                        "sha512",
                        async(err, key) => {
                            if (err) {
                                console.log(err);
                            } else {

                                const obj = {
                                    email: req.body.email,
                                    password: key.toString("base64")
                                };

                                const user2 = await User.findOne(obj);
                                console.log(user2);
                                if (user2) {

                                    // console.log(req.body._id);
                                    await User.updateOne({
                                        email: req.body.email
                                    }, {
                                        $set: {
                                            loginCnt: 0
                                        }
                                    });
                                    req.session.email = user.email;
                                    res.json({
                                        message: "You are logged in!",
                                        _id: user2._id,
                                        email: user2.email
                                    });
                                } else {
                                    //없으면 로그인 실패횟수 추가
                                    if (user.loginCnt > 4) {
                                        res.json({
                                            message: "The ID or password did not match more than 5 times and was locked \nPlease contact customer service."
                                        });
                                    } else {
                                        await User.updateOne({
                                            email: req.body.email
                                        }, {
                                            $set: {
                                                loginCnt: user.loginCnt + 1
                                            }
                                        });
                                        if (user.loginCnt >= 5) {
                                            await User.updateOne({
                                                email: req.body.email
                                            }, {
                                                $set: {
                                                    lockYn: true
                                                }
                                            });
                                            res.json({
                                                message: "The ID or password did not match more than 5 times and was locked \nPlease contact customer service."
                                            });
                                        } else {
                                            res.json({
                                                message: "ID or password do not match."
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    );
                } else {
                    res.json({
                        message: "ID or password do not match."
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: "Login failed"
        });
    }
});

router.get("/logout", (req, res) => {
    console.log("/logout" + req.sessionID);
    req.session.destroy(() => {
        res.json({
            message: true
        });
    });
});

router.post("/delete", async(req, res) => {
    try {
        await User.remove({
            _id: req.body._id
        });
        res.json({
            message: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.post("/update", async(req, res) => {
    try {
        await User.update({
            _id: req.body._id,
            name: req.body.name
        });
        res.json({
            message: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.post("/add", async(req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({
            message: true
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.post("/getAllMember", async(req, res) => {
    try {
        const user = await User.find({});
        res.json({
            message: user
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

module.exports = router;