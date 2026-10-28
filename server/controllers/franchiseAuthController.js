const bcrypt = require("bcrypt");

const {
    createFranchiseUser,
    findFranchiseByEmail
} = require("../models/franchiseUserModel");

// =========================
// Franchise Register
// =========================
const register = async (req, res) => {
    try {

        const {
            full_name,
            email,
            mobile,
            password
        } = req.body;

        // Validation
        if (!full_name || !email || !mobile || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Duplicate Email Check
        const existingUser = await findFranchiseByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Password Hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
        await createFranchiseUser({
            full_name,
            email,
            mobile,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Registration Successful. Waiting for Admin Approval."
        });

    } catch (err) {

        console.log("FRANCHISE REGISTER ERROR:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    register
};