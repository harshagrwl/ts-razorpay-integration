const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require('cors')
const bodyParser = require('body-parser')
const router = express.Router();

router.use(cors())
router.use(bodyParser.json())

const razorpay = new Razorpay({
  key_id: 'rzp_test_TOBK3BchgNixL7',
  key_secret: 'A5uZPkMlLXJpcQDdWtyZJ5RH',
});

router.post("/razorpay", async (req,res) => {

	const payment_capture = 1
	const amount = 50
	const currency = "INR"


	const options = {
		amount: (amount*100).toString(),
	 	currency,
	 	receipt: shortid.generate(),
	 	payment_capture
	}

	const response = await razorpay.orders.create(options)
	console.log(response)
	res.json({
		id: response.id,
		currency: response.currency,
		amount: response.amount
	})
})

module.exports = router;