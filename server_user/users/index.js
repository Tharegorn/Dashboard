const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const refresh = require("../token/index")
const db = require("../db/index")

function generateToken(token) {
    return jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
}

function generateRefreshToken(token) {
    return jwt.sign(token, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
}


exports.access_routes = async function (req, res) {
    switch (req.query.route) {
        case '/':
            res.status(200).json({ status: "Authorized" });
            break;
        case '/account':
            res.status(200).json({ status: "Authorized" });
            break;
        case '/admin':
            req.admin == 1 ? res.status(200).json({ status: "Authorized" }) : res.status(401).json({ status: "Unauthorized", code: 401 });
            break;
        case '/dashboard':
            res.status(200).json({ status: "Authorized" });
            break;
        default:
            res.status(401).json({ status: "Unauthorized", code: 401 });
            break;
    }
}

exports.userMiddleware = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ status: "Unauthorized, please provide a token", code: 401 });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async function (err, user) {
        if (err) res.status(401).json({ status: "Unauthorized, invalid Token", code: 401 });
        else {
            let conn = await db.pool.getConnection();
            const resp = await conn.query("SELECT user_id FROM tokens WHERE token='" + token + "';");
            if (!resp[0])
                return (res.status(401).json({ status: "Unauthorized, missing permissions", code: 401 }), conn.end());
            const id = await conn.query("SELECT perm FROM users WHERE id='" + resp[0].user_id + "';")
            req.admin = id[0].perm;
            req.user = user;
            conn.end();
            next();
        }
    })
}

exports.adminMiddleware = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ status: "Unauthorized, please provide a token", code: 401 });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async function (err, user) {
        if (err) res.status(401).json({ status: "Unauthorized, invalid Token", code: 401 });
        else {
            let conn = await db.pool.getConnection();
            const resp = await conn.query("SELECT id, name, perm FROM users WHERE name='" + user.name + "';");
            if (!resp[0] || resp[0].id != 1)
                return (res.status(401).json({ status: "Unauthorized, missing permissions", code: 401 }), conn.end());
            req.user = user;
            conn.end();
            next();
        }
    })
}

exports.promote = async function (req, res) {
    let conn = await db.pool.getConnection();
    const resp = await conn.query("SELECT id, name, perm FROM users WHERE id='" + req.body.id + "' LIMIT 1;");
    if (resp[0] && resp[0].perm == 0) {
        conn.query("UPDATE users SET perm='1' WHERE id='" + req.body.id + "';");
        conn.query("DELETE FROM tokens WHERE user_id='" + req.body.id + "';");
        res.status(200).json({ status: "Success", code: 200 });
    } else res.status(401).json({ status: "Invalid user", code: 401 });
    conn.end();
}

exports.demote = async function (req, res) {
    let conn = await db.pool.getConnection();
    const resp = await conn.query("SELECT id, name, perm FROM users WHERE id='" + req.body.id + "' LIMIT 1;");
    if (resp[0] && resp[0].perm == 1) {
        conn.query("UPDATE users SET perm='0' WHERE id='" + req.body.id + "';");
        conn.query("DELETE FROM tokens WHERE user_id='" + req.body.id + "';");
        res.status(200).json({ status: "Success", code: 200 });
    } else res.status(401).json({ status: "Invalid user", code: 401 });
    conn.end();
}

exports.delete = async function (req, res) {
    let conn = await db.pool.getConnection();
    conn.query("DELETE FROM users WHERE id='" + req.body.id + "';")
    conn.query("DELETE FROM tokens WHERE user_id='" + req.body.id + "';")
    res.status(200).json({ status: "Success", code: 200 });
    conn.end();
}

exports.register = async function (req, res) {
    let conn = await db.pool.getConnection();

    const resp = await conn.query("SELECT name FROM users WHERE name='" + req.body.user + "';");
    if (!resp[0] && req.body.user) {
        if (req.body.password != req.body.confirm_password) res.status(401).json({ status: "Missmatch passwords", code: 401 });
        else {
            const pass = await bcrypt.hash(req.body.password, 10);
            conn.query("INSERT INTO users (name, password, perm) VALUES ('" + req.body.user + "','" + pass + "', '0');")
            res.status(200).json({ status: "Success", code: 200 });
        }
    } else res.status(401).json({ status: "User Already Exists", code: 401 })
    conn.end();
}

exports.login = async function (req, res) {
    let conn = await db.pool.getConnection();
    const resp = await conn.query("SELECT id, name, password, auth_epitech FROM users WHERE name='" + req.body.user + "' LIMIT 1;");
    if (resp[0]) {
        const crypt = await bcrypt.compare(req.body.password, resp[0].password);
        if (crypt) {
            const token = generateToken({ id: resp[0].id, name: resp[0].name, auth_epitech: resp[0].auth_epitech });
            const refresh = generateRefreshToken({ id: resp[0].id, name: resp[0].name });
            const result = await conn.query("SELECT token_id FROM tokens WHERE user_id='" + resp[0].id + "';")
            if (!result[0]) conn.query("INSERT INTO tokens (user_id, token, refresh) VALUES ('" + resp[0].id + "', ' " + token + "', '" + refresh + "');")
            else conn.query("UPDATE tokens SET token='" + token + "', refresh='" + refresh + "' WHERE user_id='" + resp[0].id + "';")
            res.status(200).json({ status: "Success", code: 200, token: token, refreshToken: refresh });
        } else res.status(401).json({ status: "Invalid Password", code: 401 });
    } else res.status(401).json({ status: "Invalid Username", code: 401 });
    conn.end();
}

exports.refreshToken = async function (req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ status: "Unauthorized, please provide a token", code: 401 });
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async function (err, user) {
        if (err) res.status(401).json({ status: "Unauthorized, invalid Token", code: 401 });
        else {
            let conn = await db.pool.getConnection();
            const rest = await conn.query("SELECT user_id FROM tokens WHERE refresh='" + token + "';");
            if (rest[0]) {
                const resp = await conn.query("SELECT id, name, auth_epitech FROM users WHERE id='" + rest[0].user_id + "';")
                const tks = await refresh.refresh_token({id: resp[0].id, name: resp[0].name, auth_epitech: resp[0].auth_epitech})
                res.status(200).json({ status: "Success", code: 200, token: tks.token, refresh: tks.refresh });
            } else
                res.status(401).json({ status: "Unauthorized, invalid Refresh Token", code: 401 });
            conn.end();
        }
    })
}

exports.loadUsers = async function (req, res) {
    let conn = await db.pool.getConnection();

    const resp = await conn.query("SELECT id, name, perm, added_at AS date FROM users WHERE id !=' " + req.user.id + "';")
    res.status(200).json({ status: "Success", code: 200, users: resp })
    conn.end();
}

exports.name_update = async function (req, res) {
    let conn = await db.pool.getConnection();

    if (req.body.user && req.body.user != "") {
        conn.query("UPDATE users set name=' " + req.body.user + "' WHERE id='" + req.user.id + "'");
        res.status(200).json({ status: "Success", code: 200 });
    } else res.status(401).json({ status: "Invalid Parameters", code: 401 })
    conn.end();
}

exports.password_update = async function (req, res) {
    let conn = await db.pool.getConnection();

    if (req.body.password && req.body.password != "") {
        const hpass = await bcrypt.hash(req.body.password, 10);
        conn.query("UPDATE users set password=' " + hpass + "' WHERE id='" + req.user.id + "'");
        res.status(200).json({ status: "Success", code: 200 });
    } else res.status(401).json({ status: "Invalid Parameters", code: 401 })
    conn.end();
}