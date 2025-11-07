class CheckHolidayUseCase {
  constructor(holidayRepository) {
    this.holidayRepository = holidayRepository;
  }

  async execute(year, month, day) {
    const holidays = await this.holidayRepository.getHolidaysForDate(year, month, day);
    return {
      isHoliday: holidays.length > 0,
      holidays: holidays.map(holiday => ({
        nameKh: holiday.nameKh,
        nameEn: holiday.nameEn,
        type: holiday.type,
        isPublicHoliday: holiday.isPublicHoliday
      }))
    };
  }
}

module.exports = CheckHolidayUseCase;

