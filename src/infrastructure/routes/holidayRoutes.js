const express = require('express');
const HolidayController = require('../../presentation/controllers/HolidayController');

function createHolidayRoutes(holidayController) {
  const router = express.Router();

  router.get('/', (req, res) => holidayController.getAll(req, res));
  router.get('/date', (req, res) => holidayController.getByDate(req, res));
  router.get('/month', (req, res) => holidayController.getByMonth(req, res));
  router.get('/upcoming', (req, res) => holidayController.getUpcoming(req, res));
  router.get('/check', (req, res) => holidayController.check(req, res));
  router.get('/public', (req, res) => holidayController.getPublic(req, res));
  router.get('/religious', (req, res) => holidayController.getReligious(req, res));

  return router;
}

module.exports = createHolidayRoutes;

