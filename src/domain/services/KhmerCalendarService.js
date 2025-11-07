class KhmerCalendarService {
  static BUDDHIST_ERA_OFFSET = 543;

  static toBuddhistEra(gregorianYear) {
    return gregorianYear + this.BUDDHIST_ERA_OFFSET;
  }

  static fromBuddhistEra(buddhistEraYear) {
    return buddhistEraYear - this.BUDDHIST_ERA_OFFSET;
  }

  static getKhmerMonths() {
    return [
      'មករា',      // January
      'កុម្ភៈ',     // February
      'មីនា',       // March
      'មេសា',       // April
      'ឧសភា',       // May
      'មិថុនា',     // June
      'កក្កដា',     // July
      'សីហា',       // August
      'កញ្ញា',       // September
      'តុលា',       // October
      'វិច្ឆិកា',   // November
      'ធ្នូ'         // December
    ];
  }

  static getKhmerDays() {
    return [
      'ថ្ងៃអាទិត្យ',   // Sunday
      'ថ្ងៃច័ន្ទ',     // Monday
      'ថ្ងៃអង្គារ',    // Tuesday
      'ថ្ងៃពុធ',       // Wednesday
      'ថ្ងៃព្រហស្បតិ៍', // Thursday
      'ថ្ងៃសុក្រ',     // Friday
      'ថ្ងៃសៅរ៍'       // Saturday
    ];
  }

  static getMonthName(monthIndex) {
    const months = this.getKhmerMonths();
    return months[monthIndex - 1] || '';
  }

  static getDayName(dayIndex) {
    const days = this.getKhmerDays();
    return days[dayIndex] || '';
  }

  static formatKhmerDate(calendarDate) {
    const year = calendarDate.getYear();
    const month = calendarDate.getMonth();
    const day = calendarDate.getDay();
    const dayOfWeek = calendarDate.getDayOfWeek();

    const dayName = this.getDayName(dayOfWeek);
    const monthName = this.getMonthName(month);
    const buddhistEra = this.toBuddhistEra(year);

    return {
      gregorian: {
        year,
        month,
        day,
        dayName
      },
      buddhistEra: {
        year: buddhistEra,
        month,
        day,
        monthName,
        dayName
      },
      formatted: {
        khmer: `${dayName} ថ្ងៃទី ${day} ${monthName} ឆ្នាំ ${buddhistEra}`,
        english: `${calendarDate.toDate().toLocaleDateString('en-US', { weekday: 'long' })} ${day} ${monthName} ${buddhistEra} BE`
      }
    };
  }
}

module.exports = KhmerCalendarService;

