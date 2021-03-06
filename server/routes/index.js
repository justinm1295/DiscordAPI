const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/health', async (req, res, next) => {
    res.json({"healthcheck" : "responsive"});
});

router.post('/sales', async (req, res, next) => {
    values = [
        req.body.date, 
        req.body.enteredID, 
        req.body.enteredName, 
        req.body.sellerID, 
        req.body.sellerName, 
        req.body.item, 
        req.body.itemQuality, 
        req.body.spell1, 
        req.body.spell2, 
        req.body.price
    ];
    try {
        let results = await db.salesDB.insert(values);
        res.status(201).json({"affectedRows": results.affectedRows});
    } catch(err) {
        res.status(500).send("Unable to perform insert.");
        console.log(err);
    }
});

router.get('/sales/total', async (req, res, next) => {
    try {
        let results = await db.salesDB.total();
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/sales/item', async (req, res, next) => {
    try {
        let results = await db.salesDB.item(req.query.itemName);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.post('/messages', async (req, res, next) => {
    values = [
        req.body.date,
        req.body.userName,
        req.body.userID,
        req.body.userDiscriminator,
        req.body.content
    ];
    try {
        let results = await db.messagesDB.insert(values);
        res.status(201).json({"affectedRows": results.affectedRows});
    } catch(err) {
        res.status(500).send("Unable to perform insert.");
        console.log(err);
    }
});

router.get('/messages/count', async (req, res, next) => {
    try {
        let results = await db.messagesDB.count(req.query.userID);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/messages/total', async (req, res, next) => {
    try {
        let results = await db.messagesDB.total();
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.post('/commands', async (req, res, next) => {
    values = [
        req.body.date,
        req.body.userName,
        req.body.userID,
        req.body.userDiscriminator,
        req.body.command
    ];
    try {
        let results = await db.commandsDB.insert(values);
        res.status(201).json({"affectedRows": results.affectedRows});
    } catch(err) {
        res.status(500).send("Unable to perform insert.");
        console.log(err);
    }
});


module.exports = router;