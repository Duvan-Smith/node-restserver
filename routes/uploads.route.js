const { Router } = require("express");
const { cargarArchivos } = require("../controllers/uploads.controller");

const router = Router();

router.post("/", cargarArchivos);

module.exports = router;