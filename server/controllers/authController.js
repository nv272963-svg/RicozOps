const {
    findFranchiseByEmail,
    createFranchiseUser
} = require("../models/franchiseUserModel");

console.log("MODEL LOADED => franchiseUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// =========================
// Register User
// =========================

const register = async (req, res) => {
    console.log("REGISTER API HIT");
    try {
        const { full_name, email, mobile, password } = req.body;

        if (!full_name || !email || !mobile || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existingUser = await findFranchiseByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createFranchiseUser({
    full_name,
    email,
    mobile,
    password: hashedPassword
});

        return res.status(201).json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {

    console.log("REGISTER ERROR:");
    console.log(err);

    return res.status(500).json({
        success: false,
        message: err.message
    });

}
};
// =========================
// Login User
// =========================

const login = async (req, res) => {

    console.log("LOGIN API HIT");

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password required."
            });
        }

       const result = await findFranchiseByEmail(email);

        console.log("LOGIN REQUEST RECEIVED");

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
console.log("LOGIN JWT_SECRET =", process.env.JWT_SECRET);
       const token = jwt.sign(
{
    id: user.id,
    email: user.email
},
process.env.JWT_SECRET,
{
    expiresIn: "7d"
});

        console.log("TOKEN CREATED");

        return res.json({
            success: true,
            message: "Login Successful",
            token,
            user: {
    id: user.id,
    full_name: user.full_name,
    email: user.email
}
        });

    } catch (err) {

        console.log("LOGIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
module.exports = {
    register,
    login
};