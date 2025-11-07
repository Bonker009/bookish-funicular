const HolidayRepository = require('../../domain/repositories/HolidayRepository');
const Holiday = require('../../domain/entities/Holiday');

class HolidayRepositoryImpl extends HolidayRepository {
  constructor() {
    super();
    this.fixedHolidays = this.initializeFixedHolidays();
    this.buddhistHolyDays = this.initializeBuddhistHolyDays();
  }

  initializeFixedHolidays() {
    return [
      new Holiday({ month: 1, day: 1, nameKh: 'ទិវាចូលឆ្នាំសកល', nameEn: 'New Year', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 1, day: 7, nameKh: 'ទិវាជ័យជំនះលើរបបប្រល័យពូជសាសន៍', nameEn: 'Victory over Genocide Day', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 3, day: 8, nameKh: 'ទិវាសិទ្ធិស្ត្រីអន្តរជាតិ', nameEn: 'International Women Day', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 4, day: 14, nameKh: 'ពិធីបុណ្យចូលឆ្នាំខ្មែរ', nameEn: 'Khmer New Year Day (Day 1)', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 4, day: 15, nameKh: 'ពិធីបុណ្យចូលឆ្នាំខ្មែរ', nameEn: 'Khmer New Year Day (Day 2)', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 4, day: 16, nameKh: 'ពិធីបុណ្យចូលឆ្នាំខ្មែរ', nameEn: 'Khmer New Year Day (Day 3)', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 5, day: 1, nameKh: 'ទិវាពលករ', nameEn: 'Labour Day', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 5, day: 11, nameKh: 'វិសាខបូជា', nameEn: 'Visak Bochea Day', type: 'holy', isPublicHoliday: true }),
      new Holiday({ month: 5, day: 14, nameKh: 'ថ្ងៃខួបកំណើតព្រះមហាក្សត្រ', nameEn: 'King\'s Birthday', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 5, day: 15, nameKh: 'ទិវាព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', nameEn: 'Royal Plowing Ceremony', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 6, day: 18, nameKh: 'ថ្ងៃខួបកំណើតព្រះមាតា', nameEn: 'King\'s Mother\'s Birthday', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 9, day: 21, nameKh: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', nameEn: 'Pchum Ben Festival (Day 1)', type: 'religious', isPublicHoliday: true }),
      new Holiday({ month: 9, day: 22, nameKh: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', nameEn: 'Pchum Ben Festival (Day 2)', type: 'religious', isPublicHoliday: true }),
      new Holiday({ month: 9, day: 23, nameKh: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', nameEn: 'Pchum Ben Festival (Day 3)', type: 'religious', isPublicHoliday: true }),
      new Holiday({ month: 9, day: 24, nameKh: 'ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ', nameEn: 'Constitutional Day', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 10, day: 15, nameKh: 'ទិវារំលឹកព្រះបិតា', nameEn: 'Commemoration Day of King\'s Father', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 10, day: 29, nameKh: 'ថ្ងៃខួបគ្រងរាជ្យព្រះមហាក្សត្រ', nameEn: 'King\'s Coronation Day', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 11, day: 4, nameKh: 'បុណ្យអុំទូក', nameEn: 'Water Festival Ceremony (Day 1)', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 11, day: 5, nameKh: 'បុណ្យអុំទូក', nameEn: 'Water Festival Ceremony (Day 2)', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 11, day: 6, nameKh: 'បុណ្យអុំទូក', nameEn: 'Water Festival Ceremony (Day 3)', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 11, day: 9, nameKh: 'ទិវាប្រារព្ធទិវាឯករាជ្យជាតិ', nameEn: 'Independence Day', type: 'public', isPublicHoliday: true }),
      new Holiday({ month: 12, day: 29, nameKh: 'ទិវាសន្តិភាព', nameEn: 'Peace Day', type: 'public', isPublicHoliday: true })
    ];
  }

  initializeBuddhistHolyDays() {
    return [];
  }

  async getHolidaysForDate(year, month, day) {
    const holidays = [];
    
    for (const holiday of this.fixedHolidays) {
      if (holiday.matchesDate(year, month, day)) {
        holidays.push(holiday);
      }
    }

    for (const holiday of this.buddhistHolyDays) {
      if (holiday.matchesDate(year, month, day)) {
        holidays.push(holiday);
      }
    }

    return holidays;
  }

  async getHolidaysForYear(year) {
    const allHolidays = [];
    
    for (const holiday of this.fixedHolidays) {
      allHolidays.push(holiday);
    }

    for (const holiday of this.buddhistHolyDays) {
      allHolidays.push(holiday);
    }

    return allHolidays.sort((a, b) => {
      const dateA = new Date(`${year}-${String(a.month).padStart(2, '0')}-${String(a.day).padStart(2, '0')}`);
      const dateB = new Date(`${year}-${String(b.month).padStart(2, '0')}-${String(b.day).padStart(2, '0')}`);
      return dateA - dateB;
    });
  }

  async getHolidaysForMonth(year, month) {
    const yearHolidays = await this.getHolidaysForYear(year);
    return yearHolidays.filter(holiday => holiday.month === month);
  }

  async getAllFixedHolidays() {
    return [...this.fixedHolidays];
  }

  async getAllBuddhistHolyDays() {
    return [...this.buddhistHolyDays];
  }
}

module.exports = HolidayRepositoryImpl;

