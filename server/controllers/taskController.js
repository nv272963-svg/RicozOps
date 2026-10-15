const db = require("../config/db");

console.log("TASK CONTROLLER LOADED");

// ================= ADD TASK =================
exports.addTask = async (req, res) => {

    const {
        task_title,
        description,
        employee_id,
        project_id,
        priority,
        status,
        start_date,
        due_date
    } = req.body;
console.log(req.body);
    try {

        await db.execute(
            `INSERT INTO tasks
            (
                task_title,
                description,
                employee_id,
                project_id,
                priority,
                status,
                start_date,
                due_date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                task_title,
                description,
                employee_id,
                project_id,
                priority,
                status,
                start_date,
                due_date
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Task Added Successfully"
        });

    } catch (err) {

        console.log("ADD TASK ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= GET TASKS =================

exports.getTasks = async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                t.id,
                t.task_title,
                t.description,
                t.employee_id,
                t.project_id,
                e.full_name AS employee_name,
                p.project_name,
                t.priority,
                t.status,
                t.start_date,
                t.due_date
            FROM tasks t
            LEFT JOIN employees e
                ON t.employee_id = e.id
            LEFT JOIN projects p
                ON t.project_id = p.id
            ORDER BY t.id DESC
        `);

        return res.status(200).json({
            success: true,
            count: rows.length,
            tasks: rows
        });

    } catch (err) {

        console.log("GET TASK ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= UPDATE TASK =================

exports.updateTask = async (req, res) => {

    const { id } = req.params;

    const {
        task_title,
        description,
        employee_id,
        project_id,
        priority,
        status,
        start_date,
        due_date
    } = req.body;

    try {

        await db.execute(
            `UPDATE tasks
             SET
                task_title = ?,
                description = ?,
                employee_id = ?,
                project_id = ?,
                priority = ?,
                status = ?,
                start_date = ?,
                due_date = ?
             WHERE id = ?`,
            [
                task_title,
                description,
                employee_id,
                project_id,
                priority,
                status,
                start_date,
                due_date,
                id
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        });

    } catch (err) {

        console.log("UPDATE TASK ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= DELETE TASK =================

exports.deleteTask = async (req, res) => {

    const { id } = req.params;

    try {

        await db.execute(
            "DELETE FROM tasks WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        });

    } catch (err) {

        console.log("DELETE TASK ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};