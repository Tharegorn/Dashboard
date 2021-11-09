const bcrypt = require("bcrypt");
module.exports = {

    check_token: async function check_token(conn, token) {
        const req = await conn.query(
            "SELECT * FROM tokens WHERE token = '" + token + "';"
        );
        if (!req[0]) {
            return await Promise.resolve("failure");
        } else {
            return await Promise.resolve("success");
        }
    },

    allUsers: async function allUsers(conn, name) {
        const req = await conn.query(
            "SELECT * FROM users WHERE name != '" + name + "';"
        );
        let result = [];
        for (var a = 0; req[a]; a++) {
            result = [...result, req[a]];
        }
        return await Promise.resolve(result);
    },

    getInfoWithMdp: async function getInfoWithMdp(conn, name, pass) {
        const req = await conn.query(
            "SELECT * FROM users WHERE name='" + name + "';"
        );
        if (req[0]) {
            const crypt = await bcrypt.compare(pass, req[0].password);
            if (crypt)
                return (result = await Promise.resolve({
                    code: 0,
                    name: req[0].name,
                    id: req[0].id,
                    perm: req[0].perm,
                }));
            else return (result = await Promise.resolve({ code: 1 }));
        } else return (result = await Promise.resolve({ code: 1 }));
    },

    getInfo: async function getInfo(conn, name) {
        const req = await conn.query("SELECT * FROM users;");
        if (req[0]) {
            for (var i = 0; req[i]; i++) {
                if (name === req[i].name) return (result = await Promise.resolve(1));
            }
            return (result = await Promise.resolve(0));
        } else {
            return (result = await Promise.resolve(2));
        }
    },

    verifyIdentity: async function verifyIdentity(conn, token) {
        const req = await conn.query(
            "SELECT * FROM tokens WHERE token='" + jwt.decode(token).token + "';"
        );
        if (req[0]) return (result = await Promise.resolve(0));
        else return (result = await Promise.resolve(1));
    },


}