const mariadb = require("mariadb")

exports.pool = mariadb.createPool({
    host: "db",
    database: "user_db",
    user: "user",
    password: "test",
    connectionLimit: 10,
});