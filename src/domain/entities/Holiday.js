class Holiday {
  constructor({ month, day, nameKh, nameEn, type, isPublicHoliday }) {
    this.month = month;
    this.day = day;
    this.nameKh = nameKh;
    this.nameEn = nameEn;
    this.type = type; // 'public', 'religious', 'holy'
    this.isPublicHoliday = isPublicHoliday;
  }

  matchesDate(year, month, day) {
    return this.month === month && this.day === day;
  }

  toJSON(year) {
    const dateStr = `${year}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`;
    return {
      month: this.month,
      day: this.day,
      nameKh: this.nameKh,
      nameEn: this.nameEn,
      type: this.type,
      isPublicHoliday: this.isPublicHoliday,
      date: dateStr,
      year,
      buddhistEra: year + 543
    };
  }
}

module.exports = Holiday;

