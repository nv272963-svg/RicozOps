const Partner = require("../models/partnerModel");

const createPartner = async (req, res) => {
    try {
        const {
            full_name,
            mobile,
            email,
            city,
            state,
            occupation,
            investment,
            message
        } = req.body;

        // Basic Validation
        if (!full_name || !mobile || !email) {
            return res.status(400).json({
                success: false,
                message: "Full Name, Mobile and Email are required."
            });
        }

        const result = await Partner.createPartner({
            full_name,
            mobile,
            email,
            city,
            state,
            occupation,
            investment,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Partner application submitted successfully.",
            data: result
        });

    } catch (error) {

        console.error("Partner Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    createPartner
};