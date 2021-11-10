const bcrypt = require("bcrypt");

module.exports = {
    update: async function update(conn, name, password, id) {
        if (password) {
            const hpass = await bcrypt.hash(password, 10);
            const req = await conn.query("UPDATE users SET password='" + hpass + "' WHERE id= " + id + ";")
        } else {
            const req = await conn.query("UPDATE users SET name='" + name + "' WHERE id='" + id + "';")
        }
    }
}