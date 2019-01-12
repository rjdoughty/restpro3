const Menu = require('../models/Menu');

module.exports = function (app) {

  app.get('/api/menu', function (req, res) {
    Menu.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });


  });

}