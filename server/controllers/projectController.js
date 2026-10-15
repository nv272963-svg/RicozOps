const db = require("../config/db");

console.log("PROJECT CONTROLLER LOADED");

// ================= ADD PROJECT =================
exports.addProject = async (req, res) => {

    const {
    project_name,
    project_code,
    client_name,
    department_id,
    project_manager,
    start_date,
    end_date,
    budget,
    progress,
    priority,
    status,
    description
} = req.body;

    try {

        await db.execute(
            `INSERT INTO projects
(
project_name,
project_code,
client_name,
department_id,
project_manager,
start_date,
end_date,
budget,
progress,
priority,
status,
description
)
VALUES
(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
project_name,
project_code,
client_name,
department_id,
project_manager,
start_date,
end_date,
budget,
progress,
priority,
status,
description
]
        );

        return res.status(201).json({
            success: true,
            message: "Project Added Successfully"
        });

    } catch (err) {

    console.log("========== PROJECT ERROR ==========");
    console.log(err);
    console.log("Code:", err.code);
    console.log("Errno:", err.errno);
    console.log("SQL Message:", err.sqlMessage);
    console.log("SQL:", err.sql);
    console.log("===================================");

    return res.status(500).json({
        success: false,
        error: err.message
    });
}

};

// ================= GET PROJECTS =================
exports.getProjects = async (req, res) => {

    try {

        const [projects] = await db.execute(
            `SELECT
                p.*,
                d.department_name
             FROM projects p
             LEFT JOIN departments d
             ON p.department_id = d.id
             ORDER BY p.id DESC`
        );

        return res.json({
            success: true,
            count: projects.length,
            projects
        });

    } catch (err) {

        console.log("GET PROJECT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= UPDATE PROJECT =================

exports.updateProject = async (req, res) => {

    const { id } = req.params;

    const {
    project_name,
    project_code,
    client_name,
    department_id,
    project_manager,
    start_date,
    end_date,
    budget,
    progress,
    priority,
    status,
    description
} = req.body;
    try {

        await db.execute(
    `UPDATE projects
SET
    project_name = ?,
    project_code = ?,
    client_name = ?,
    department_id = ?,
    project_manager = ?,
    start_date = ?,
    end_date = ?,
    budget = ?,
    progress = ?,
    priority = ?,
    status = ?,
    description = ?
WHERE id = ?`,
    [
    project_name,
    project_code,
    client_name,
    department_id,
    project_manager,
    start_date,
    end_date,
    budget,
    progress,
    priority,
    status,
    description,
    id
]
);

        return res.status(200).json({
            success: true,
            message: "Project Updated Successfully"
        });

    } catch (err) {

        console.log("UPDATE PROJECT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= DELETE PROJECT =================

exports.deleteProject = async (req, res) => {

    const { id } = req.params;

    try {

        await db.execute(
            "DELETE FROM projects WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Project Deleted Successfully"
        });

    } catch (err) {

        console.log("DELETE PROJECT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }
};