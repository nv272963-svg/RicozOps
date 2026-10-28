const db = require("../config/db");

// Find franchise user by email
const findFranchiseByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM franchise_users WHERE email = ?",
        [email]
    );
    return rows;
};

// Create franchise user
const createFranchiseUser = async (user) => {

    const {
        full_name,
        email,
        mobile,
        password
    } = user;

    const [result] = await db.query(
        `INSERT INTO franchise_users
        (full_name,email,mobile,password)
        VALUES (?,?,?,?)`,
        [
            full_name,
            email,
            mobile,
            password
        ]
    );

    return result;
};

module.exports = {
    findFranchiseByEmail,
    createFranchiseUser
};