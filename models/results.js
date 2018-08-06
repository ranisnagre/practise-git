let express = require('express');
let connection = require('../config/mysql-connection');
let router = express.Router();

router.get('/', function (req, res) {
    let query = `SELECT * from results`;
    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length == 0) {
            res.send({ 'result': 'id is not found' });
        } else {
            res.send(results);
        }

    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    let query = `SELECT * from results WHERE id = ${id}`;

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length == 0) {
            res.send({ 'result': 'id is not found' });
        } else {
            res.send(results);
        }

    });

});
router.put('/:id', function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let rank = req.body.rank;
    let validDays = req.body.validDays;
    let available = req.body.available;
    let query = `UPDATE results SET
                    name = "${name}",
                    rank = "${rank}",
                    validDays = "${validDays}",
                    available = "${available}"
            WHERE id = ${id}
            `;
    console.log(query);

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'results': 'Updated unsuccessfully' });
        } else {
            res.send({ 'results': 'Updated successfully' });
        }
    });
});
router.post('/', function (req, res) {

    let name = req.body.name;
    let rank = req.body.rank;
    let validDays = req.body.validDays;
    let available = req.body.available;
    let query = `INSERT INTO results SET
                    name = "${name}",
                    rank = "${rank}",
                    validDays = "${validDays}",
                    available = "${available}"
                `;
    console.log(query);
    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'results': 'Updated unsuccessfully' });
        } else {
            res.send({ 'results': 'Updated successfully' });
        }
    });
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`delete from results where id = ${id}`, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'result': 'Deleted unsuccessfully' });
        } else {
            res.send({ 'result': 'Deleted successfully' });
        }
    });
});


module.exports = router;
