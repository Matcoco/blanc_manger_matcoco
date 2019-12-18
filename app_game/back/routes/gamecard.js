const express = require('express');
const router = express.Router();
const connection = require("./conf");

// On récupère ici la table gamecard.

router.get('/', (req, res) => {
    connection.query('SELECT * FROM gamecard',
    (err, results) => {
        if (err) {
            console.log('Issue');
        } else {
            console.log('Ok');
            res.json(results);
        }
    });
});

// On récupère ici le texte d'une carte JEU.

router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM gamecard WHERE id=?',
    [req.params.id],
    (error, results, fields) => {
        if (error) {
            res.json(error);
        } 
        else if (results.length === 0) {
            res.status(404).json('Invalid id')
        }
        else {
            res.json(results[0]);
        }
    });
});

// PARTIE PERSONALISATION

// On ajoute une carte JEU.

router.post('/', (req, res) => {
    connection.query('INSERT INTO gamecard (text) VALUES (?)',
    [req.body.text],
    (err, results) => {
        if (error) {
            console.log('Issue')
        } else {
            console.log('Ok')
            req.body.id = results.insertId;
            res.json(req.body);
        }
    })
});

// On supprime une carte JEU.

router.delete('/:id', (req, res) => {
    connection.query('SELECT * FROM gamecard WHERE id =?',
    [req.params.id],
    (error, results, fields) => {
        if (error) {
            res.json(error);
        } else if (results.length === 0) {
                res.status(404).json("invalid id");
        } else {
            const output = results[0];
            connection.query(
                "DELETE FROM gamecard WHERE id=?",
                [req.params.id],
                (error, results, fields) => {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(output);
                    }
            })
        }
    });
});


module.exports = router;