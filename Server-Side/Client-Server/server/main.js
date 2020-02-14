// define constructor function that gets `app, sql, config` send to it
module.exports = (app, sql, config) => {
    app.get('/api/players/top', async (req, res) => {
        return await sql.connect(config)
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

    app.get('/api/players/:email', async (req, res) => {
        return await sql.connect(config)
            .then(() => sql.query`select Player_Email, Player_Name, Player_Score 
                                    from Players where Player_Email = ${req.params.email}`)
            .then(result => {
                sql.close();
                if (parseInt(result.rowsAffected) === 0) return res.status(404).json('notExist');
                res.status(200).send(result.recordsets);
            }).catch(err => {
                console.warn(err);
                res.status(500).send(false);
            });
    });

    app.get('/api/figures', async (req, res) => {
        return await sql.connect(config)
            .then(() => sql.query`select * from Figures`)
            .then(result => {
                sql.close();
                res.status(200).send(result.recordsets);
            }).catch(err => {
                console.warn(err);
                res.status(500).send(err);
            });
    });

    app.get('/api/figuresOfPlayer/:email', async (req, res) => {
        return await sql.connect(config)
            .then(() => sql.query`select * from FiguresOfPlayer 
                                    where Player_Email = ${req.params.email}`)
            .then(result => {
                sql.close();
                if (parseInt(result.rowsAffected) === 0) return res.status(404).json('notExist');
                res.status(200).send(result.recordsets);
            }).catch(err => {
                console.warn(err);
                res.status(500).send(false);
            });
    });

    app.post('/api/figuresOfPlayer/addFigure', async (req, res) => {
        // sql connection
        return await sql.connect(config)
            .then(() => sql.query`insert into FiguresOfPlayer(Player_Email, Figure_Name) values(${req.body.email}, ${req.body.figureName})`)
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

    app.delete('/api/figuresOfPlayer/deleteFigure', async (req, res) => {
        // sql connection
        return await sql.connect(config)
            .then(() => sql.query`delete from FiguresOfPlayer
                            where Player_Email = ${req.body.email} and Figure_Name = ${req.body.figureName}`)
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

    app.put('/api/game/addPoint', async (req, res) => {
        console.log(req.body.point);
        // sql connection
        return await sql.connect(config)
            .then(() => sql.query`update players
                            set Player_Score = Player_Score + ${req.body.point} where Player_Email = ${req.body.email}`)
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