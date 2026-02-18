const express = require("express");
const router = express.Router();
const db = require("../db");

// Order History
router.get("/orders", (req, res) => {
  const query = `
    SELECT 
      o.order_id,
      c.name,
      p.product_name,
      o.quantity,
      (p.price * o.quantity) AS total_amount,
      o.order_date
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
    JOIN Products p ON o.product_id = p.product_id
    ORDER BY o.order_date DESC
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
