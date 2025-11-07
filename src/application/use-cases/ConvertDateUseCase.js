const CalendarDate = require('../../domain/entities/CalendarDate');
const KhmerCalendarService = require('../../domain/services/KhmerCalendarService');

class ConvertDateUseCase {
  constructor(holidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  async execute(dateString) {
    const calendarDate = new CalendarDate(dateString);
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

module.exports = ConvertDateUseCase;

