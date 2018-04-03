//libraries
const express = require('express');

const db = require('./data/db.js'); //database functions

const server = express();

server.use(express.json())


server.get("/", function (req, res) {
    res.send({ api: 'Running' });
});

server.get("/api/users", (req, res) => {
    db.find().then(users => {//get data
        res.json(users);
    }).catch(error => {//send error (if any)
        res.status(500).json(err);
    })
});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db.findById(id).then(users => {//get data
        res.json(users);
        //send error (if any)
    }).catch(error => {
        res.status(500).json(err);
    })
});

server.post("/api/users/", (req, res) => {
    const bod = req.body;
    console.log(bod);
    db.insert(bod).then(users => {
        if (bod.name === "" || bod.bio === "")
            throw "";
        //return full list of users
        db.find().then(users => {
            res.json(users);
        })

        //return error (if any)
    }).catch(error => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
});

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params

    db.remove(id).then(users => {

        db.find().then(users => {
            res.json(users);
        })

    }).catch(error => {
        res.status(400).json({ errorMessage: "Something Happaned. Idk What It Was Tho." })
    })
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    if (!name || !bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    db.update(id, req.body).then(users => {

        db.find().then(users => {//get data
            res.status(200).json(users);
        }).catch(error => {//send error (if any)
            res.status(500).json(err);
        })

    }).catch(error => {
        res.status(400).json({ errorMessage: "The user with the specified ID does not exist." })
    })
});


const port = 5000;  //bind server to port 5000
server.listen(port, () => console.log('API Running on port ' + port)); //notify user that server is running on defined port

