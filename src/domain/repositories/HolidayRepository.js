class HolidayRepository {
  async getHolidaysForDate(year, month, day) {
    throw new Error('Method must be implemented');
  }

  async getHolidaysForYear(year) {
    throw new Error('Method must be implemented');
  }

  async getHolidaysForMonth(year, month) {
    throw new Error('Method must be implemented');
  }

  async getAllFixedHolidays() {
    throw new Error('Method must be implemented');
  }

  async getAllBuddhistHolyDays() {
    throw new Error('Method must be implemented');
  }
}

module.exports = HolidayRepository;

