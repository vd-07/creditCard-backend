const db = require("../config/database");

exports.createAccount = async (req, res) => {
  const { account_id, 
    customer_id, 
    account_limit, 
    per_transaction_limit, 
    last_account_limit, 
    last_per_transaction_limit
    } = req.body;
  const { rows } = await db.query(
    "INSERT INTO customer (account_id, customer_id, account_limit, per_trannsaction_limit, last_account_limit, last_per_transaction_limit) VALUES ($1, $2, $3, $4, $5, $6)",
    [
        account_id, 
        customer_id, 
        account_limit, 
        per_transaction_limit, 
        last_account_limit, 
        last_per_transaction_limit
    ]
  );

  res.status(201).send({
    message: "Account created successfully!",
    body: {
      account: { 
            account_id, 
            customer_id, 
            account_limit, 
            per_transaction_limit, 
            last_account_limit, 
            last_per_transaction_limit
        }
    },
  });
};

exports.getAccount = async (req, res) => {
    const { account_id } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM customer WHERE account_id = $1;', [account_id]);
        console.log(rows);
        if(rows.length === 0) {
            res.status(404).send({
                message: "No account found with the given account_id."
            })
        } else {
            res.status(200).send({
                message: "Account found successfully!",
                account: rows[0]
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while searching for the account.",
            error: error.message
        });
    }
}