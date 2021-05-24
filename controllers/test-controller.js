const { Test } = require("../models");

module.exports = {
	create: ({ body }, res) => {
		Test.create(body)
			.then((data) => res.json(data))
			.catch((err) => console.log(err));
	},
	getAll: (req, res) => {
		Test.find({})
			.sort({ _id: -1 })
			.then((data) => res.json(data))
			.catch((err) => console.log(err));
	},
	update: ({ params, body }, res) => {
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
	},
	delete: ({ params }, res) => {
		Test.findByIdAndDelete(params.id)
			.then(() => {
				res.json(true);
			})
			.catch((err) => {
				res.json(err);
			});
	}
};
