const router = require("express").Router();
const { Test } = require("../models");

router.post("/test/create", ({ body }, res) => {
	console.log("something");
	Test.create(body)
		.then((data) => res.json(data))
		.catch((err) => console.log(err));
});

router.get("/test/read", (req, res) => {
	Test.find({})
		.sort({ _id: -1 })
		.then((data) => res.json(data))
		.catch((err) => console.log(err));
});

router.put("/test/update/:id", ({ params, body }, res) => {
	Test.findByIdAndUpdate(
		params.id,
		{ $set: { title: body.title, body: body.body } },
		{ new: true }
	)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.delete("/test/delete/:id", ({ params }, res) => {
	Test.findByIdAndDelete(params.id)
		.then(() => {
			res.json(true);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
