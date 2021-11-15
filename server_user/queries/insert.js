const bcrypt = require("bcrypt");

module.exports = {
    addToken: async function addToken(conn, token, uid) {
        const req = await conn.query(
            "INSERT INTO tokens (user_id, token) VALUES ('" +
            uid +
            "', '" +
            token +
            "');"
        );
    },

    addUser: async function addUser(conn, name, password) {
        const hpass = await bcrypt.hash(password, 10);
        const req = await conn.query(
            "INSERT INTO users (name, password, perm) VALUES ('" +
            name +
            "', '" +
            hpass +
            "', 0);"
        );
    },
    add_note: async function addNote(conn, id, title, content) {
        const req = await conn.query("INSERT INTO notes (user_id, title, content) \
        VALUES ('" + id + "', '" + title + "', '" + content + "');");
    }
}