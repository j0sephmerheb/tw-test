const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Tw = require('../../models/Tw');
const testMiddleware = require('../../middelwares/test');

var tws = [];

// Get
Router.get('/', testMiddleware, async (req, res) => {
    // res.status(200).send('GET Tws');

    try {
        tws = await Tw.find();

        if (tws && tws.length > 0) {
            res.status(200).json(tws);
        }
        else {
            res.status(404).json({ "message": "Nothing found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})


// Get by id
Router.get('/:twId', async (req, res) => {
    twId = req.params.twId;

    try {
        const tw = await Tw.findById(twId);

        if (tw) {
            res.status(200).json(tw);
        }
        else {
            res.status(404).json({ "message": "Message not found" })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }

    // res.status(200).json(tw);
})


// Post
Router.post('/', (req, res) => {
    console.log(req.body.message);

    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
                res.status(200).send(tw);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            })
    } else {
        res.status(500).json({ error: "Please put some values" });
    }
})


// Delete
Router.delete('/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.remove({
        _id: twId
    }, (err) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        else {
            res.status(200).json({ "message": "Message deleted" });
        }
    })

})


// Patch
/*Router.patch('/:twId', (req, res) => {
    twId = req.params.twId;
    newMsg = req.body.message;

    try {
        const tw = await Tw.findByIdAndUpdate(
            twId,
            {
                message: newMsg
            },
            {
                new: true
            }
        )
        if (tw) {
            res.status(200).json(tw);
        }
        else {
            res.status(404).json({ "message": "Message not found" })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})*/

module.exports = Router;