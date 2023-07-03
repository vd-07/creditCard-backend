const db = require("../config/database");

exports.createOffer = async (req, res) => {
    const { account_id, limit_type, new_limit, offer_activation_time, offer_expiry_time } = req.body;

    // Check if the new limit is greater than the current limit
    const currentLimitQuery = `
        SELECT account_limit
        FROM customer
        WHERE account_id = $1;
    `;
    try {
        const { rows } = await db.query(currentLimitQuery, [account_id]);
        if(rows.length === 0) {
            return res.status(404).send({
                message: "No account found with the given account_id."
            });
        } else {
            const current_limit = rows[0].account_limit;

            if (new_limit <= current_limit) {
                return res.status(400).json({ message: 'New limit should be greater than the current limit.' });
            }
        }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error retrieving the current limit from the database.' });
    }

    // Create the limit offer
    const createLimitOfferQuery = `
        INSERT INTO offer (account_id, limit_type, new_limit, offer_activation_time, offer_expiry_time, status)
        VALUES ($1, $2, $3, $4, $5, 'PENDING')
        RETURNING limit_offer_id;
    `;
    try {
        const { rows } = await db.query(createLimitOfferQuery, [account_id, limit_type, new_limit, offer_activation_time, offer_expiry_time]);
        const limitOfferId = rows[0].limit_offer_id;

        return res.status(201).json({ message: 'Limit offer created successfully.', limitOfferId });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error creating the limit offer.' });
    }
};

exports.getOffer = async (req, res) => {
    const { account_id, active_date } = req.body;

    let query = `
        SELECT *
        FROM offer
        WHERE account_id = $1
        AND status = 'PENDING'
        AND offer_activation_time < $2
        AND offer_expiry_time > $2;
    `;
    let params = [account_id, active_date];

    try {
        const { rows } = await db.query(query, params);
        return res.status(200).json({ offers: rows });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error retrieving active offers.' });
    }
};

// update offer touches two tables, so the operation should be atomic, can use ticket based design
exports.updateOffer = async (req, res) => {

};