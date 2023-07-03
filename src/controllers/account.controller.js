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