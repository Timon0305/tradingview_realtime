const express = require("express");
const router = express.Router();
const Board = require("../models/board");

router.post("/delete", async(req, res) => {
    try {
        await Board.remove({
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
        await Board.update({
            _id: req.body._id
        }, {
            $set: {
                title: req.body.title,
                content: req.body.content
            }
        });
        res.json({
            message: "Post has been modified."
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.post("/write", async(req, res) => {
    try {
        let obj;

        obj = {
            writer: req.body._id,
            title: req.body.title,
            content: req.body.content,
        };
        console.log(obj)
        const board = new Board(obj);
        await board.save();
        res.json({
            message: "Your post has been uploaded."
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.post("/getBoardList", async(req, res) => {
    try {
        const _id = req.body._id;
        const board = await Board.find({
            writer: _id
        }, null, {
            sort: {
                createdAt: -1
            }
        });
        res.json({
            list: board
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

router.post("/detail", async(req, res) => {
    try {
        const _id = req.body._id;
        const board = await Board.find({
            _id
        });
        res.json({
            board
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: false
        });
    }
});

module.exports = router;