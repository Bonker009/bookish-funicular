const GetHolidaysUseCase = require('../../application/use-cases/GetHolidaysUseCase');
const CheckHolidayUseCase = require('../../application/use-cases/CheckHolidayUseCase');
const CalendarDate = require('../../domain/entities/CalendarDate');
const KhmerCalendarService = require('../../domain/services/KhmerCalendarService');

class HolidayController {
  constructor(getHolidaysUseCase, checkHolidayUseCase) {
    this.getHolidaysUseCase = getHolidaysUseCase;
    this.checkHolidayUseCase = checkHolidayUseCase;
  }

  async getAll(req, res) {
    try {
      const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
      
      if (isNaN(year) || year < 1900 || year > 2100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid year. Must be a number between 1900 and 2100.'
        });
      }

      const holidays = await this.getHolidaysUseCase.executeForYear(year);
      
      res.json({
        success: true,
        year,
        buddhistEra: year + 543,
        total: holidays.length,
        publicHolidays: holidays.filter(h => h.isPublicHoliday).length,
        data: holidays
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getByDate(req, res) {
    try {
      const { date } = req.query;
      
      if (!date) {
        return res.status(400).json({
          success: false,
          error: 'Date parameter is required. Format: YYYY-MM-DD'
        });
      }

      const calendarDate = new CalendarDate(date);
      const year = calendarDate.getYear();
      const month = calendarDate.getMonth();
      const day = calendarDate.getDay();
      
      const holidays = await this.getHolidaysUseCase.executeForDate(year, month, day);
      
      res.json({
        success: true,
        date,
        isHoliday: holidays.length > 0,
        count: holidays.length,
        data: holidays
      });
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

  async getByMonth(req, res) {
    try {
      const currentDate = new Date();
      const year = req.query.year ? parseInt(req.query.year) : currentDate.getFullYear();
      const month = req.query.month ? parseInt(req.query.month) : currentDate.getMonth() + 1;
      
      if (isNaN(year) || year < 1900 || year > 2100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid year. Must be a number between 1900 and 2100.'
        });
      }
      
      if (isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({
          success: false,
          error: 'Invalid month. Must be a number between 1 and 12.'
        });
      }

      const holidays = await this.getHolidaysUseCase.executeForMonth(year, month);
      
      res.json({
        success: true,
        year,
        month,
        buddhistEra: year + 543,
        monthName: KhmerCalendarService.getMonthName(month),
        total: holidays.length,
        data: holidays
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getUpcoming(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      
      if (isNaN(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit. Must be a number between 1 and 100.'
        });
      }

      const holidays = await this.getHolidaysUseCase.executeUpcoming(limit);
      
      res.json({
        success: true,
        limit,
        count: holidays.length,
        data: holidays
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async check(req, res) {
    try {
      const { date } = req.query;
      
      if (!date) {
        return res.status(400).json({
          success: false,
          error: 'Date parameter is required. Format: YYYY-MM-DD'
        });
      }

      const calendarDate = new CalendarDate(date);
      const year = calendarDate.getYear();
      const month = calendarDate.getMonth();
      const day = calendarDate.getDay();
      
      const result = await this.checkHolidayUseCase.execute(year, month, day);
      
      res.json({
        success: true,
        date,
        ...result
      });
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

  async getPublic(req, res) {
    try {
      const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
      
      if (isNaN(year) || year < 1900 || year > 2100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid year. Must be a number between 1900 and 2100.'
        });
      }

      const holidays = await this.getHolidaysUseCase.executePublicOnly(year);
      
      res.json({
        success: true,
        year,
        buddhistEra: year + 543,
        total: holidays.length,
        data: holidays
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getReligious(req, res) {
    try {
      const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
      
      if (isNaN(year) || year < 1900 || year > 2100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid year. Must be a number between 1900 and 2100.'
        });
      }

      const holidays = await this.getHolidaysUseCase.executeReligiousOnly(year);
      
      res.json({
        success: true,
        year,
        buddhistEra: year + 543,
        total: holidays.length,
        data: holidays
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = HolidayController;

