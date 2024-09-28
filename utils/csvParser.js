// utils/csvParser.js
const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Trade = require('../models/trade');

async function parseCSV(file) {
  const trades = [];
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      const trade = new Trade({
        utcTime: new Date(row['UTC_Time']),
        operation: row['Operation'],
        market: row['Market'],
        baseCoin: row['Market'].split('/')[0],
        quoteCoin: row['Market'].split('/')[1],
        buySellAmount: parseFloat(row['Buy/Sell Amount']),
        price: parseFloat(row['Price'])
      });
      trades.push(trade);
    })
    .on('end', () => {
      Trade.insertMany(trades, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Trades inserted successfully!');
        }
      });
    });
}

module.exports = parseCSV;