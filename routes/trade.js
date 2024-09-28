// routes/trade.js
const express = require('express');
const router = express.Router();
const csvParser = require('../utils/csvParser');

router.post('/balance', (req, res) => {
    const timestamp = new Date(req.body.timestamp);
    const balances = {};
  
    Trade.find({ utcTime: { $lte: timestamp } })
      .then((trades) => {
        trades.forEach((trade) => {
          const baseCoin = trade.baseCoin;
          if (balances[baseCoin]) {
            if (trade.operation === 'Buy') {
              balances[baseCoin] += trade.buySellAmount;
            } else {
              balances[baseCoin] -= trade.buySellAmount;
            }
          } else {
            balances[baseCoin] = trade.operation === 'Buy' ? trade.buySellAmount : -trade.buySellAmount;
          }
        });
        res.json(balances);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  });
  
  module.exports = router;