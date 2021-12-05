const axios = require('axios')
const refresh = require('../token/index')
const db = require("../db/index")

exports.set_autologin = async function (req, res) {
    if (!req.body.auth || req.body.auth.length != 45)
        res.status(401).json({ status: 'Invalid parameters', code: '401' });
    else {
        let conn = await db.pool.getConnection();
        conn.query("UPDATE users SET auth_epitech='" + req.body.auth + "' WHERE id=' " + req.user.id + "';")
        conn.end();
        const tks = await refresh.refresh_token({ id: req.user.id, name: req.user.name, auth_epitech: req.body.auth });
        res.status(200).json({ status: 'Success', code: '200', token: tks.token, refresh: tks.refresh });
    }
}

exports.get_profile = function (req, resd) {
    if (!req.user.auth_epitech)
        resd.status(401).json({ status: "Unauthorized", code: 401 });
    else {
        axios.get("https://intra.epitech.eu/" + req.user.auth_epitech + "/user/?format=json").then((res) => {
            resd.status(200).json({
                email: res.data.login,
                first: res.data.firstname,
                last: res.data.lastname,
                vity: res.data.location,
                picture: "https://intra.epitech.eu/" + req.user.auth_epitech + res.data.picture,
                credits: res.data.credits,
                promo: res.data.promo,
                gpa: res.data.gpa[0].gpa
            })
        }).catch((err) => {
            resd.status(401).json({ status: "Unauthorized", code: 401 });
            throw err;
        })
    }
}

exports.get_planning = function () {

}