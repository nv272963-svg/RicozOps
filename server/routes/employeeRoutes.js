console.log("EMPLOYEE ROUTES FILE RUNNING");
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const employeeController = require("../controllers/employeeController");

console.log(employeeController);
router.get("/test", (req, res) => {
    res.send("Employee Route Working");
});

router.post("/add", verifyToken, employeeController.addEmployee);

router.get("/", verifyToken, employeeController.getEmployees);
router.put("/update/:id", verifyToken, employeeController.updateEmployee);
router.delete("/delete/:id", verifyToken, employeeController.deleteEmployee);
module.exports = router;