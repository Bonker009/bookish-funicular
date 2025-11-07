const express = require('express');
const CalendarController = require('../../presentation/controllers/CalendarController');

function createCalendarRoutes(calendarController) {
  const router = express.Router();

  router.get('/current', (req, res) => calendarController.getCurrent(req, res));
  router.get('/convert', (req, res) => calendarController.convert(req, res));
  router.post('/convert', (req, res) => calendarController.convert(req, res));
  router.get('/months', (req, res) => calendarController.getMonths(req, res));
  router.get('/days', (req, res) => calendarController.getDays(req, res));
  router.get('/buddhist-era/:year', (req, res) => calendarController.convertBuddhistEra(req, res));
  router.get('/gregorian/:beYear', (req, res) => calendarController.convertGregorian(req, res));

  return router;
}

module.exports = createCalendarRoutes;

