const bcrypt = require("bcrypt");

module.exports = {
    update: async function update(conn, name, password, id) {
        if (password) {
            const hpass = await bcrypt.hash(password, 10);
            const req = await conn.query("UPDATE users SET password='" + hpass + "' WHERE id= " + id + ";")
        } else {
            const req = await conn.query("UPDATE users SET name='" + name + "' WHERE id='" + id + "';")
        }
    },
    note_title_updt: async function updt(conn, id, title) {
        if (title != "") {
            title.replace("'", " ");
            title.replace('"', " ");
            title.replace(';', " ");
            await conn.query("UPDATE notes SET title='" + title + "' WHERE id='" + id + "';");
        }
    },
    note_content_updt: async function updt(conn, id, content) {
        if (content != "") {
            content.replace("'", " ");
            content.replace('"', " ");
            content.replace(';', " ");
            await conn.query("UPDATE notes SET content='" + content + "' WHERE id='" + id + "';");
        }
    }
}