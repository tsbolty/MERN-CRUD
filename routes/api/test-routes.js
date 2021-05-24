const router = require("express").Router();
const controller = require("../../controllers/test-controller");

router.route("/").post(controller.create).get(controller.getAll);

router.route("/:id").put(controller.update).delete(controller.delete);

module.exports = router;
