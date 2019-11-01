var express = require('express');
var router = express.Router();
var stripe_secret_key = process.env.StripeSecretKey;
const stripe = require('stripe')(stripe_secret_key);

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
