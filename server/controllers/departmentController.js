const db = require("../config/db");

console.log("DEPARTMENT CONTROLLER LOADED");

// ================= ADD DEPARTMENT =================
exports.addDepartment = async (req, res) => {

    const {
        department_name,
        department_code,
        description,
        status
    } = req.body;

    try {

        await db.execute(
            `INSERT INTO departments
            (department_name, department_code, description, status)
            VALUES (?, ?, ?, ?)`,
            [
                department_name,
                department_code,
                description,
                status || "Active"
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Department Added Successfully"
        });

    } catch (err) {

        console.log("ADD DEPARTMENT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

// ================= GET ALL DEPARTMENTS =================
exports.getDepartments = async (req, res) => {

    try {

        const [departments] = await db.execute(
            "SELECT * FROM departments ORDER BY id DESC"
        );

        return res.status(200).json({
            success: true,
            count: departments.length,
            departments
        });

    } catch (err) {

        console.log("GET DEPARTMENT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= UPDATE DEPARTMENT =================
exports.updateDepartment = async (req, res) => {

    const { id } = req.params;

    const {
        department_name,
        department_code,
        description,
        status
    } = req.body;

    try {

        await db.execute(
            `UPDATE departments
             SET department_name=?,
                 department_code=?,
                 description=?,
                 status=?
             WHERE id=?`,
            [
                department_name,
                department_code,
                description,
                status,
                id
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Department Updated Successfully"
        });

    } catch (err) {

        console.log("UPDATE DEPARTMENT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= DELETE DEPARTMENT =================
exports.deleteDepartment = async (req, res) => {

    const { id } = req.params;

    try {

        await db.execute(
            "DELETE FROM departments WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Department Deleted Successfully"
        });

    } catch (err) {

        console.log("DELETE DEPARTMENT ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};