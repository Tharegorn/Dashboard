const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: "db",
    database: "user_db",
    user: "user",
    password: "test",
    connectionLimit: 10,
});

exports.get_user_widgets = async function (req, res) {
    let conn = await pool.getConnection()

    const youtube = await conn.query("SELECT id, channel FROM youtube WHERE user_id='1';")
    const currency = await conn.query("SELECT id FROM currency WHERE user_id='1';")
    const weather = await conn.query("SELECT id, city FROM weather WHERE user_id='1';")

    res.status(200).json({status: "success", code: 200, youtube: youtube, weather: weather, currency: currency})
    conn.end()
}