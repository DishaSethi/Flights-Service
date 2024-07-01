const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
router.post('/',
        FlightMiddlewares.validateCreateRequest,
       FlightController.createFlight);

// /api/v1/airports GET

module.exports = router;