const db = require("../config/db");

console.log("DASHBOARD CONTROLLER LOADED");

// ================= DASHBOARD STATS =================

exports.getDashboardStats = async (req, res) => {

    try {

        const [[employees]] = await db.execute(
            "SELECT COUNT(*) AS total FROM employees"
        );

        const [[departments]] = await db.execute(
            "SELECT COUNT(*) AS total FROM departments"
        );

        const [[projects]] = await db.execute(
            "SELECT COUNT(*) AS total FROM projects"
        );
        // ================= PROJECT STATUS =================

const [projectStatus] = await db.execute(`
SELECT
status,
COUNT(*) AS total
FROM projects
GROUP BY status
`);
const [[revenue]] = await db.execute(
    "SELECT IFNULL(SUM(budget),0) AS total FROM projects"
);
        const [[tasks]] = await db.execute(
            "SELECT COUNT(*) AS total FROM tasks"
        );

        const [[attendance]] = await db.execute(
            "SELECT COUNT(*) AS total FROM attendance WHERE attendance_date = CURDATE()"
        );

        const [[leaves]] = await db.execute(
            "SELECT COUNT(*) AS total FROM leaves WHERE status='Pending'"
        );

        return res.status(200).json({

            success: true,

           dashboard: {

    totalEmployees: employees.total,

    totalDepartments: departments.total,

    totalProjects: projects.total,

totalRevenue: revenue.total,

    totalTasks: tasks.total,

   

    todayAttendance: attendance.total,

    pendingLeaves: leaves.total,
    projectStatus: projectStatus

}

        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            error: err.message

        });

    }

};
// ================= DASHBOARD ANALYTICS =================

exports.getDashboardAnalytics = async (req, res) => {

    try {

        // Revenue by Month
        const [revenue] = await db.execute(`
            SELECT
                MONTH(start_date) AS month,
                SUM(budget) AS revenue
            FROM projects
            GROUP BY MONTH(start_date)
            ORDER BY MONTH(start_date)
        `);

        // Project Status
        const [status] = await db.execute(`
            SELECT
                status,
                COUNT(*) AS total
            FROM projects
            GROUP BY status
        `);

        // Employees by Department
    const [departments] = await db.execute(`
SELECT
d.name AS department,
COUNT(e.id) AS total
FROM departments d
LEFT JOIN employees e
ON d.id = e.department_id
GROUP BY d.id, d.name
`);
// Task Status
const [tasks] = await db.execute(`
    SELECT
        status,
        COUNT(*) AS total
    FROM tasks
    GROUP BY status
`);
        res.json({

            success: true,

           analytics: {

    revenue,

    projectStatus: status,

    departments,

    taskStatus: tasks

}

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ==========================================
// GET RECENT ACTIVITIES
// ==========================================

exports.getRecentActivities = async (req, res) => {

    try {

        const [activities] = await db.execute(`
            SELECT *
            FROM activities
            ORDER BY created_at DESC
            LIMIT 10
        `);

        res.json({

            success: true,

            activities

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};