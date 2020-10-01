
const db = require("../models");
const Btc = db.btcs;


exports.create = (req, res) => {
    // Validate request

    // Create a btc
    var btc = {
        price: req.price,
        regdate: req.regdate
    };
    console.log("price: %s , regdata %s", req.price, req.regdate);

    // Save btc in the database
    Btc.save(btc)
        .then(data => {
            // res.send(data);
        })
        .catch(err => {
            console.log('\x1b[31m' + err.message);
            // res.status(500).send({
            //     message:
            //         err.message || "Some error occurred while creating the btc."
            // });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Btc.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving btcs."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Btc.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found btc with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving btc with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Btc.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};
