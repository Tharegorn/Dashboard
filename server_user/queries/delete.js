module.exports = {
    Promove: async function Promove(conn, id, perm) {
        await conn.query("DELETE FROM tokens WHERE user_id = '" + id + "';");
        await conn.query(
            "UPDATE users SET perm = '" + perm + "' WHERE id = '" + id + "';"
        );
    },

    Delete: async function Delete(conn, id) {
        const res = await conn.query(
            "DELETE FROM tokens WHERE user_id = '" + id + "';"
        );
        const req = await conn.query("DELETE FROM users WHERE id = '" + id + "';");
    }, 
    Delete_note: async function DelNote(conn, id) {
        await conn.query("DELETE FROM notes WHERE id='" + id + "';");
    }
}