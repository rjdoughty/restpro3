const Order = require('../models/Order');

module.exports = function (app) {

  app.post('/api/Orders', function (req, res) {
    Order.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/api/Orders', function (req, res) {
    Order.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.put('/api/Orders/:order_id', function (req, res) {
    Order.findOneAndUpdate({ _id: req.body._id }, { isCompleted: req.body.isCompleted })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });



  app.delete('/api/Orders/:order_id', function (req, res) {
    Order.findByIdAndRemove(req.params.order_id)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

}