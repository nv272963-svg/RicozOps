console.log("NOTIFICATION CONTROLLER LOADED");

const db = require("../config/db");

/* ==========================================================
   GET ALL NOTIFICATIONS
========================================================== */

exports.getNotifications = async (req, res) => {

    try {

        const [rows] = await db.execute(`

            SELECT

                n.id,
                n.employee_id,
                n.title,
                n.message,
                n.type,
                n.priority,
                n.is_read,
                n.created_at,
                e.full_name AS employee_name

            FROM notifications n

            LEFT JOIN employees e
                ON n.employee_id = e.id

            ORDER BY n.created_at DESC

        `);

        return res.status(200).json({

            success: true,
            count: rows.length,
            notifications: rows

        });

    }

    catch (error) {

        console.log("GET NOTIFICATIONS ERROR :", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/* ==========================================================
   ADD NOTIFICATION
========================================================== */

exports.addNotification = async (req, res) => {

    try {

        const {

            employee_id,
            title,
            message,
            type,
            priority

        } = req.body;

        const [result] = await db.execute(

            `INSERT INTO notifications
            (
                employee_id,
                title,
                message,
                type,
                priority
            )
            VALUES (?, ?, ?, ?, ?)`,

            [
                employee_id,
                title,
                message,
                type,
                priority
            ]

        );

        return res.status(201).json({

            success: true,
            message: "Notification Added Successfully",
            id: result.insertId

        });

    }

    catch (error) {

        console.log("ADD NOTIFICATION ERROR :", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
/* ==========================================================
   UPDATE NOTIFICATION
========================================================== */

exports.updateNotification = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            employee_id,
            title,
            message,
            type,
            priority,
            is_read

        } = req.body;

        const [result] = await db.execute(

            `UPDATE notifications
             SET
                employee_id = ?,
                title = ?,
                message = ?,
                type = ?,
                priority = ?,
                is_read = ?
             WHERE id = ?`,

            [
                employee_id,
                title,
                message,
                type,
                priority,
                is_read,
                id
            ]

        );

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Notification not found"

            });

        }

        return res.json({

            success: true,
            message: "Notification Updated Successfully"

        });

    }

    catch (error) {

        console.log("UPDATE ERROR :", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
/* ==========================================================
   MARK NOTIFICATION AS READ
========================================================== */

exports.markAsRead = async (req, res) => {

    try {

        const { id } = req.params;

        const [result] = await db.execute(

            `UPDATE notifications
             SET is_read = 1
             WHERE id = ?`,

            [id]

        );

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Notification not found"

            });

        }

        return res.json({

            success: true,
            message: "Notification marked as read"

        });

    }

    catch (error) {

        console.log("MARK AS READ ERROR :", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
/* ==========================================================
   DELETE NOTIFICATION
========================================================== */

exports.deleteNotification = async (req, res) => {

    try {

        const { id } = req.params;

        const [result] = await db.execute(

            `DELETE FROM notifications
             WHERE id = ?`,

            [id]

        );

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Notification not found"

            });

        }

        return res.json({

            success: true,
            message: "Notification deleted successfully"

        });

    }

    catch (error) {

        console.log("DELETE ERROR :", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};