const db = require("../config/db");

// Create User
const createUser = async (userData) => {

    const sql = `
      INSERT INTO franchise_users
(full_name, email, mobile, password)
VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
    userData.full_name,
    userData.email,
    userData.mobile,
    userData.password
]);
    return result;
};

// Find User by Email
const findUserByEmail = async (email) => {

    const [rows] = await db.execute(
        "SELECT * FROM franchise_users WHERE email = ?",
        [email]
    );

    return rows;
};

// Find User by ID
const findUserById = async (id) => {

    const [rows] = await db.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows;
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};