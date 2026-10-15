const db = require("../config/db");

// ==========================================
// GET SETTINGS
// ==========================================

exports.getSettings = async (req, res) => {

    try {

        const [rows] = await db.query("SELECT * FROM settings LIMIT 1");

        res.json({
            success: true,
            settings: rows[0]
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load settings"
        });

    }

};

// ==========================================
// UPDATE PROFILE
// ==========================================

exports.updateProfile = async (req, res) => {

    try {

        const {

            full_name,
            email,
            phone,
            designation

        } = req.body;

        await db.query(

            `UPDATE settings
             SET
             full_name=?,
             email=?,
             phone=?,
             designation=?
             WHERE id=1`,

            [

                full_name,
                email,
                phone,
                designation

            ]

        );

        res.json({

            success: true,
            message: "Profile Updated Successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Update Failed"

        });

    }

};

// ==========================================
// UPDATE COMPANY
// ==========================================

exports.updateCompany = async (req, res) => {

    try {

        const {

            company_name,
            website,
            support_email,
            address

        } = req.body;

        await db.query(

            `UPDATE settings
             SET
             company_name=?,
             website=?,
             support_email=?,
             address=?
             WHERE id=1`,

            [

                company_name,
                website,
                support_email,
                address

            ]

        );

        res.json({

            success: true,
            message: "Company Settings Updated"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Update Failed"

        });

    }

};
// ==========================================
// UPDATE SECURITY
// ==========================================

exports.updateSecurity = async (req, res) => {

    try {

        const {

            current_password,
            new_password

        } = req.body;

        // Current Password Database se lo
        const [rows] = await db.query(
            "SELECT password FROM settings WHERE id = 1"
        );

        if (rows.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Settings not found"

            });

        }

        // Password Match Check
        if (rows[0].password !== current_password) {

            return res.json({

                success: false,
                message: "Current Password is Incorrect"

            });

        }

        // Password Update
        await db.query(

            `UPDATE settings
             SET password = ?
             WHERE id = 1`,

            [new_password]

        );

        res.json({

            success: true,
            message: "Password Updated Successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Password Update Failed"

        });

    }

};
// ==========================================
// UPDATE APPEARANCE
// ==========================================

exports.updateAppearance = async (req, res) => {

    try {

        const {

            theme,
            primary_color,
            font_size

        } = req.body;

        await db.query(

            `UPDATE settings
             SET
             theme = ?,
             primary_color = ?,
             font_size = ?
             WHERE id = 1`,

            [

                theme,
                primary_color,
                font_size

            ]

        );

        res.json({

            success: true,
            message: "Appearance Updated Successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Appearance Update Failed"

        });

    }

};