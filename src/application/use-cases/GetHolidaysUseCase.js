class GetHolidaysUseCase {
  constructor(holidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  async executeForYear(year) {
    const holidays = await this.holidayRepository.getHolidaysForYear(year);
    return holidays.map(holiday => holiday.toJSON(year));
  }

  async executeForMonth(year, month) {
    const holidays = await this.holidayRepository.getHolidaysForMonth(year, month);
    return holidays.map(holiday => holiday.toJSON(year));
  }

  async executeForDate(year, month, day) {
    const holidays = await this.holidayRepository.getHolidaysForDate(year, month, day);
    return holidays.map(holiday => holiday.toJSON(year));
  }

  async executeUpcoming(limit = 10) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;
    
    const currentYearHolidays = await this.holidayRepository.getHolidaysForYear(currentYear);
    const nextYearHolidays = await this.holidayRepository.getHolidaysForYear(nextYear);
    
    const allUpcoming = [...currentYearHolidays, ...nextYearHolidays]
      .map(holiday => {
        const year = currentYearHolidays.includes(holiday) ? currentYear : nextYear;
        return { ...holiday.toJSON(year), holiday };
      })
      .filter(item => {
        const holidayDate = new Date(item.date);
        return holidayDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
    
    return allUpcoming.map(item => {
      const { holiday, ...rest } = item;
      return rest;
    });
  }

  async executePublicOnly(year) {
    const holidays = await this.holidayRepository.getHolidaysForYear(year);
    return holidays
      .filter(holiday => holiday.isPublicHoliday)
      .map(holiday => holiday.toJSON(year));
  }

  async executeReligiousOnly(year) {
    const holidays = await this.holidayRepository.getHolidaysForYear(year);
    return holidays
      .filter(holiday => holiday.type === 'religious' || holiday.type === 'holy')
      .map(holiday => holiday.toJSON(year));
  }
}

module.exports = GetHolidaysUseCase;

