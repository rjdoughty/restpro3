const Menu = require('../models/Menu');


module.exports = function (app) {

  app.get('/api/Menu', function (req, res) {
    Menu.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post('/api/Menu', function (req, res) {
    Menu.create(req.body)
      .then(function (data) {
        res.json(data);
        console.log(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  }); 

  
}