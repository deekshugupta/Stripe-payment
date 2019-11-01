var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_d98FbbU2Tnwp8vdGReDRcsRk005ZSN3B0S');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/charge',function(req,res){
  const token = req.body.stripeToken; // Using Express

(async () => {
  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'inr',
    description: 'Example charge',
    source: token,
  });
  if(charge.status == "succeeded" && charge.paid == true)
  {
    res.render('success', { message: 'Payment done Successfully' });
  }
  else{
    res.render('error', { message: 'Payment Failed' });
  }
})();
});

module.exports = router;
