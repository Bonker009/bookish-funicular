class CalendarDate {
  constructor(date) {
    this.date = new Date(date);
    if (isNaN(this.date.getTime())) {
      throw new Error('Invalid date');
    }
  }

  getYear() {
    return this.date.getFullYear();
  }

  getMonth() {
    return this.date.getMonth() + 1; // 1-12
  }

  getDay() {
    return this.date.getDate();
  }

  getDayOfWeek() {
    return this.date.getDay(); // 0-6
  }

  toISOString() {
    return this.date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  toDate() {
    return this.date;
  }
}

module.exports = CalendarDate;

