const db = require("../db/index")

exports.new_note = async function (req, res) {
    if (req.body.content && req.body.title) {
        let conn = await db.pool.getConnection();
        conn.query("INSERT INTO notes (user_id, title, content) VALUES ('" + req.user.id + "', '" + req.body.title + "', '" + req.body.content + "');")
        conn.end();
        res.status(200).json({ status: "Success", code: 200 });
    } else res.status(401).json({ status: "Invalid Parameters", code: 401 });
}

exports.get_notes = async function (req, res) {
    let conn = await db.pool.getConnection();
    const resp = await conn.query("SELECT id, title, content FROM notes WHERE user_id = '" + req.user.id + "';")
    if (resp.length > 0)
        res.status(200).json({ status: "Success", code: 200, content: resp })
    else
        res.status(200).json({ status: "Success", code: 200, content: null })
    conn.end();
}

exports.update_note = async function (req, res) {
    let conn = await db.pool.getConnection();
    if (req.body.title && req.body.title != "") {
        conn.query("UPDATE notes SET title='" + req.body.title + "' WHERE id='" + req.body.id + "';");
        res.status(200).json({ status: "Success", code: 200 })
    } else if (req.body.content && req.body.content != "") {
        conn.query("UPDATE notes SET content='" + req.body.content + "' WHERE id='" + req.body.id + "';");
        res.status(200).json({ status: "Success", code: 200 })
    } else res.status(401).json({ status: "Invalid Parameters", code: 401 })
    conn.end();
};

exports.delete_note = async function (req, res) {
    let conn = await db.pool.getConnection();
    conn.query("DELETE FROM notes WHERE id='" + req.body.id + "';");
    conn.end();
    res.status(200).json({ status: "Success", code: 200 });
}