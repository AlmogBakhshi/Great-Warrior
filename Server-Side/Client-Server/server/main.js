// define constructor function that gets `app, sql, config` send to it
module.exports = (app, sql, config) => {
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
}