const express = require('express');
const app = express();
const sql = require('mssql');

app.use(express.json());

// generate a hash from string
const crypto = require('crypto');
const key = 'greatWarrior';

// mssql connection
const config = {
    user: 'site04',
    password: '8?Ntd6s8',
    server: '185.60.170.14',
    database: 'site04',
    options: { encrypt: false }
}

app.get('/api/players/top', (req, res) => {
    sql.connect(config)
        .then(() => sql.query`select top(100) Player_Email, Player_Name, Player_Score 
                            from Players where Player_Score > 0 order by Player_Score desc`)
        .then(result => {
            sql.close();
            res.status(200).send(result.recordsets);
        }).catch(err => {
            console.warn(err);
            res.status(500).send(err);
        });
});


//#region login and register
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
//#endregion

app.get('/api/players/:email', async (req, res) => {
    return await sql.connect(config)
        .then(() => sql.query`select Player_Email, Player_Name, Player_Score from Players where Player_Email = ${req.params.email}`)
        .then(result => {
            sql.close();
            if (parseInt(result.rowsAffected) === 0) return res.status(404).json('notExist');
            res.status(200).send(result.recordsets);
        }).catch(err => {
            console.warn(err);
            res.status(500).send(false);
        });
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));