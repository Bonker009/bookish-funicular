const GetCurrentDateUseCase = require('../../application/use-cases/GetCurrentDateUseCase');
const ConvertDateUseCase = require('../../application/use-cases/ConvertDateUseCase');
const KhmerCalendarService = require('../../domain/services/KhmerCalendarService');

class CalendarController {
  constructor(getCurrentDateUseCase, convertDateUseCase) {
    this.getCurrentDateUseCase = getCurrentDateUseCase;
    this.convertDateUseCase = convertDateUseCase;
  }

  async getCurrent(req, res) {
    try {
      const data = await this.getCurrentDateUseCase.execute();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async convert(req, res) {
    try {
      const date = req.query.date || req.body.date;
      
      if (!date) {
        return res.status(400).json({
          success: false,
          error: 'Date is required. Format: YYYY-MM-DD'
        });
      }

      const data = await this.convertDateUseCase.execute(date);
      res.json({ success: true, data });
    } catch (error) {
      if (error.message === 'Invalid date') {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format. Please use YYYY-MM-DD'
        });
      }
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  getMonths(req, res) {
    try {
      const months = KhmerCalendarService.getKhmerMonths();
      res.json({
        success: true,
        data: months.map((name, index) => ({
          index: index + 1,
          khmer: name,
          english: new Date(2000, index, 1).toLocaleDateString('en-US', { month: 'long' })
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  getDays(req, res) {
    try {
      const days = KhmerCalendarService.getKhmerDays();
      res.json({
        success: true,
        data: days.map((name, index) => ({
          index,
          khmer: name,
          english: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index]
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  convertBuddhistEra(req, res) {
    try {
      const year = parseInt(req.params.year);
      
      if (isNaN(year)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid year. Must be a number.'
        });
      }

      res.json({
        success: true,
        data: {
          gregorian: year,
          buddhistEra: KhmerCalendarService.toBuddhistEra(year),
          difference: KhmerCalendarService.BUDDHIST_ERA_OFFSET
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  convertGregorian(req, res) {
    try {
      const beYear = parseInt(req.params.beYear);
      
      if (isNaN(beYear)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Buddhist Era year. Must be a number.'
        });
      }

      res.json({
        success: true,
        data: {
          buddhistEra: beYear,
          gregorian: KhmerCalendarService.fromBuddhistEra(beYear),
          difference: KhmerCalendarService.BUDDHIST_ERA_OFFSET
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = CalendarController;

