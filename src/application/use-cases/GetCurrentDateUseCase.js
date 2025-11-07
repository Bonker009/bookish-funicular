const CalendarDate = require('../../domain/entities/CalendarDate');
const KhmerCalendarService = require('../../domain/services/KhmerCalendarService');

class GetCurrentDateUseCase {
  constructor(holidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  async execute() {
    const now = new Date();
    const calendarDate = new CalendarDate(now.toISOString().split('T')[0]);
    
    const formattedDate = KhmerCalendarService.formatKhmerDate(calendarDate);
    
    const year = calendarDate.getYear();
    const month = calendarDate.getMonth();
    const day = calendarDate.getDay();
    const holidays = await this.holidayRepository.getHolidaysForDate(year, month, day);
    
    return {
      ...formattedDate,
      holidays: holidays.length > 0 ? holidays.map(h => h.toJSON(year)) : null,
      isHoliday: holidays.length > 0
    };
  }
}

module.exports = GetCurrentDateUseCase;

