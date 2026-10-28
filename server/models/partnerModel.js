const db = require("../config/db");

const createPartner = async (partnerData) => {

    const sql = `
        INSERT INTO partner_applications
        (
            full_name,
            mobile,
            email,
            city,
            state,
            occupation,
            investment,
            message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        partnerData.full_name,
        partnerData.mobile,
        partnerData.email,
        partnerData.city,
        partnerData.state,
        partnerData.occupation,
        partnerData.investment,
        partnerData.message
    ];

    const [result] = await db.execute(sql, values);

    return {
        id: result.insertId,
        ...partnerData
    };
};

module.exports = {
    createPartner
};