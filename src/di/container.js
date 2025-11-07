const HolidayRepositoryImpl = require('../infrastructure/repositories/HolidayRepositoryImpl');
const GetCurrentDateUseCase = require('../application/use-cases/GetCurrentDateUseCase');
const ConvertDateUseCase = require('../application/use-cases/ConvertDateUseCase');
const GetHolidaysUseCase = require('../application/use-cases/GetHolidaysUseCase');
const CheckHolidayUseCase = require('../application/use-cases/CheckHolidayUseCase');
const CalendarController = require('../presentation/controllers/CalendarController');
const HolidayController = require('../presentation/controllers/HolidayController');

class DIContainer {
  constructor() {
    this.holidayRepository = new HolidayRepositoryImpl();

    this.getCurrentDateUseCase = new GetCurrentDateUseCase(this.holidayRepository);
    this.convertDateUseCase = new ConvertDateUseCase(this.holidayRepository);
    this.getHolidaysUseCase = new GetHolidaysUseCase(this.holidayRepository);
    this.checkHolidayUseCase = new CheckHolidayUseCase(this.holidayRepository);

    this.calendarController = new CalendarController(
      this.getCurrentDateUseCase,
      this.convertDateUseCase
    );
    this.holidayController = new HolidayController(
      this.getHolidaysUseCase,
      this.checkHolidayUseCase
    );
  }

  getDependencies() {
    return {
      calendarController: this.calendarController,
      holidayController: this.holidayController
    };
  }
}

module.exports = DIContainer;

