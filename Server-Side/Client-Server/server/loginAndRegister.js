// generate a hash from string
const crypto = require('crypto');
const key = 'greatWarrior';

// define constructor function that gets `app, sql, config` send to it
module.exports = (app, sql, config) => {
    app.post('/api/players/login', async (req, res) => {
        // create hahs
        const hash = crypto.createHmac('sha512', key)
        hash.update(req.body.password);
        const password = hash.digest('hex');
        return await sql.connect(config)
            .then(() => sql.query`select Player_Email from Players 
                            where Player_Email = ${req.body.email} and Player_Password = ${password}`)
            .then(result => {
                sql.close();
                if (parseInt(result.rowsAffected) === 0) return res.status(404).json('notExist');
                res.status(200).json(req.body.email);
            }).catch(err => {
                console.warn(err);
                res.status(500).send(false);
            });
    });

    app.post('/api/players/register', (req, res) => {
        // create hahs
        const hash = crypto.createHmac('sha512', key)
        hash.update(req.body.password);
        const password = hash.digest('hex');
        // sql connection
        sql.connect(config)
            .then(() => sql.query`insert into Players(Player_Email, Player_Password) values(${req.body.email}, ${password})`)
            .then(result => {
                sql.close();
                if (parseInt(result.rowsAffected) === 0) return res.status(500).send(false)
                res.status(200).json(req.body.email);
            })
            .catch(err => {
                console.warn(err);
                res.status(500).send(false);
            });
    });

    app.post('/api/players/socialRegister', async (req, res) => {
        // sql connection
        return await sql.connect(config)
            .then(() => sql.query`insert into Players(Player_Email) values(${req.body.email})`)
            .then(result => {
                sql.close();
                if (parseInt(result.rowsAffected) === 0) return res.status(500).send(false)
                res.status(200).json(req.body.email);
            })
            .catch(err => {
                console.warn(err);
                res.status(500).send(false);
            });
    });
}