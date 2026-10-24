const db = require("../config/db");

console.log("EMPLOYEE CONTROLLER LOADED");

// ================= ADD EMPLOYEE =================

exports.addEmployee = async (req, res) => {
    const {
        employee_id,
        full_name,
        email,
        phone,
        department,
        designation,
        salary,
        joining_date
    } = req.body;

    try {
        // Check all required fields
if (
    !employee_id ||
    !full_name ||
    !email ||
    !phone ||
    !department ||
    !designation ||
    !salary ||
    !joining_date
) {
    return res.status(400).json({
        success: false,
        message: "All fields are required."
    });
}
// Check duplicate Employee ID or Email
const [existing] = await db.execute(
    `SELECT id FROM employees
     WHERE email = ?`,
    [email]
);

if (existing.length > 0) {
    return res.status(400).json({
        success: false,
        message: "Employee ID or Email already exists."
    });
}
      await db.execute(
`INSERT INTO employees
(
    full_name,
    email,
    phone,
    department_id,
    designation,
    salary,
    joining_date,
    status
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
[
    full_name,
    email,
    phone,
    1, // IT Department
    designation,
    salary,
    joining_date,
    "Active"
]
);

        return res.status(201).json({
            success: true,
            message: "Employee Added Successfully"
        });

    } catch (err) {
        console.log("ADD ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// ================= GET EMPLOYEES =================
exports.getEmployees = async (req, res) => {

    console.log("GET EMPLOYEES API HIT");

    try {

       const [employees] = await db.execute(`
SELECT
e.id,
e.employee_id,
e.full_name,
e.email,
e.phone,
e.department_id,
d.department_name,
e.designation,
e.salary,
e.joining_date,
e.status
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id
ORDER BY e.id DESC
`);

        console.log("Employees:", employees);

        return res.status(200).json({
            success: true,
            count: employees.length,
            employees
        });

    } catch (err) {

        console.log("GET ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
// ================= UPDATE EMPLOYEE =================
exports.updateEmployee = async (req, res) => {

    const { id } = req.params;
console.log("UPDATE BODY =", req.body);
console.log("UPDATE ID =", id);
    const {
        employee_id,
        full_name,
        email,
        phone,
        department_id,
        designation,
        salary,
        joining_date,
        status
    } = req.body;

    try {
// Check employee exists
const [employee] = await db.execute(
    "SELECT id FROM employees WHERE id = ?",
    [id]
);

if (employee.length === 0) {
    return res.status(404).json({
        success: false,
        message: "Employee not found."
    });
}
        await db.execute(
            `UPDATE employees
SET
    employee_id=?,
    full_name=?,
    email=?,
    phone=?,
    department_id=?,
    designation=?,
    salary=?,
    joining_date=?,
    status=?
WHERE id=?`,
           [
    employee_id,
    full_name,
    email,
    phone,
    department_id,
    designation,
    salary,
    joining_date,
    status,
    id
]
        );

        return res.json({
            success: true,
            message: "Employee Updated Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
// ================= DELETE EMPLOYEE =================
exports.deleteEmployee = async (req, res) => {

    const { id } = req.params;

    try {
// Check employee exists
const [employee] = await db.execute(
    "SELECT id FROM employees WHERE id = ?",
    [id]
);

if (employee.length === 0) {
    return res.status(404).json({
        success: false,
        message: "Employee not found."
    });
}
        await db.execute(
            "DELETE FROM employees WHERE id = ?",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    } catch (err) {

    console.log("DELETE ERROR:", err);
    console.log(err.message);

    return res.status(500).json({
        success: false,
        error: err.message
    });

}

};