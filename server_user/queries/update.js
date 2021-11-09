module.exports = {
    update: async function update(conn, name, password, id) {
        console.log(name, password, id)
        if (password) {
        //     const req = await conn.query("UPDATE users SET password=" + password + "WHERE id= " + id + ";")
        } else {
            console.log("nique")
            const req = await conn.query("UPDATE users SET name='" + name + "' WHERE id='" + id + "';")
        }
    }
}