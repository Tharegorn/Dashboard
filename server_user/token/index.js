const jwt = require("jsonwebtoken")
const db = require("../db/index")

exports.refresh_token = async function new_refresh_token(user) {
    let conn = await db.pool.getConnection();

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
    const refresh = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    conn.query("UPDATE tokens SET token='" + token + "', refresh='" + refresh + "' WHERE user_id='" + user.id + "';")
    conn.end();
    return (await Promise.resolve({token:token, refresh: refresh}))
}