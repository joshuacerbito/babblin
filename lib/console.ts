import express = require('express');

module.exports = (app: express.Application) => {
  app.listen(5000, function () {
    console.clear();
    console.log(
      'Babbl.in is now running on https://localhost:5000',
      '\n================================================='
    );
  });
};
