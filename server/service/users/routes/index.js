"use strict";

const Controller = require("../controllers/users");

const router = require("express").Router();

router.get("/", Controller.findAllUsers);
router.get("/:id", Controller.findOneUser);
router.post("/create", Controller.createUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
