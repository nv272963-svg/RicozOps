const db = require("../config/db");

// ================= ADD NOTIFICATION =================

exports.addNotification = async (req, res) => {

    const {
        employee_id,
        title,
        message
    } = req.body;

    try {

        await db.execute(
            `INSERT INTO notifications
            (
                employee_id,
                title,
                message
            )
            VALUES (?, ?, ?)`,
            [
                employee_id,
                title,
                message
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Notification Added Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

// ================= GET =================

exports.getNotifications = async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                n.id,
                e.full_name,
                n.title,
                n.message,
                n.is_read,
                n.created_at
            FROM notifications n
            LEFT JOIN employees e
            ON n.employee_id = e.id
            ORDER BY n.id DESC
        `);

        return res.json({
            success: true,
            notifications: rows
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

// ================= DELETE =================

exports.deleteNotification = async (req, res) => {

    try {

        await db.execute(
            "DELETE FROM notifications WHERE id=?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Notification Deleted"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};