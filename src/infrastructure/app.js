const express = require('express');
const cors = require('cors');
const createCalendarRoutes = require('./routes/calendarRoutes');
const createHolidayRoutes = require('./routes/holidayRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

function createApp(dependencies) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Cambodia Khmer Calendar API',
      version: '1.0.0',
      description: 'National API for Cambodia holidays, holy days, and Khmer calendar',
      architecture: 'Clean Architecture',
      baseUrl: `${req.protocol}://${req.get('host')}`,
      documentation: {
        overview: 'This API provides comprehensive calendar and holiday information for Cambodia, including Khmer calendar conversions, Buddhist Era dates, and all national holidays and observances.',
        features: [
          'Khmer calendar date conversions',
          'Buddhist Era (BE) date calculations',
          'Complete list of Cambodia public holidays',
          'Religious and holy day observances',
          'Holiday lookup by date, month, or year',
          'Upcoming holidays query',
          'Holiday filtering (public vs religious)'
        ],
        responseFormat: {
          success: true,
          data: 'Response data object',
          error: 'Error message (only on failure)'
        },
        errorCodes: {
          400: 'Bad Request - Invalid parameters',
          404: 'Not Found - Endpoint or resource not found',
          500: 'Internal Server Error'
        }
      },
      endpoints: {
        calendar: {
          'GET /api/health': {
            description: 'Health check endpoint to verify API status',
            parameters: 'None',
            example: `${req.protocol}://${req.get('host')}/api/health`,
            response: {
              status: 'healthy',
              timestamp: 'ISO 8601 timestamp',
              service: 'Khmer Calendar API',
              architecture: 'Clean Architecture'
            }
          },
          'GET /api/current': {
            description: 'Get current date in Khmer calendar format with holiday information',
            parameters: 'None',
            example: `${req.protocol}://${req.get('host')}/api/current`,
            response: {
              success: true,
              data: {
                gregorian: { year: 2024, month: 11, day: 7, dayName: 'ថ្ងៃសុក្រ' },
                buddhistEra: { year: 2567, month: 11, day: 7, monthName: 'វិច្ឆិកា', dayName: 'ថ្ងៃសុក្រ' },
                formatted: { khmer: '...', english: '...' },
                holidays: 'Array of holidays or null',
                isHoliday: 'boolean'
              }
            }
          },
          'GET /api/convert': {
            description: 'Convert any date to Khmer calendar format',
            parameters: {
              date: 'YYYY-MM-DD (required) - Date to convert'
            },
            example: `${req.protocol}://${req.get('host')}/api/convert?date=2024-04-15`,
            response: 'Same format as /api/current'
          },
          'POST /api/convert': {
            description: 'Convert date to Khmer format via POST request',
            parameters: {
              body: { date: 'YYYY-MM-DD (required)' }
            },
            example: `POST ${req.protocol}://${req.get('host')}/api/convert\nBody: { "date": "2024-04-15" }`,
            response: 'Same format as /api/current'
          },
          'GET /api/months': {
            description: 'Get list of all Khmer month names',
            parameters: 'None',
            example: `${req.protocol}://${req.get('host')}/api/months`,
            response: {
              success: true,
              data: [
                { index: 1, khmer: 'មករា', english: 'January' },
                '...'
              ]
            }
          },
          'GET /api/days': {
            description: 'Get list of all Khmer day names',
            parameters: 'None',
            example: `${req.protocol}://${req.get('host')}/api/days`,
            response: {
              success: true,
              data: [
                { index: 0, khmer: 'ថ្ងៃអាទិត្យ', english: 'Sunday' },
                '...'
              ]
            }
          },
          'GET /api/buddhist-era/:year': {
            description: 'Convert Gregorian year to Buddhist Era (BE)',
            parameters: {
              year: 'Path parameter - Gregorian year (e.g., 2024)'
            },
            example: `${req.protocol}://${req.get('host')}/api/buddhist-era/2024`,
            response: {
              success: true,
              data: {
                gregorian: 2024,
                buddhistEra: 2567,
                difference: 543
              }
            }
          },
          'GET /api/gregorian/:beYear': {
            description: 'Convert Buddhist Era year to Gregorian',
            parameters: {
              beYear: 'Path parameter - Buddhist Era year (e.g., 2567)'
            },
            example: `${req.protocol}://${req.get('host')}/api/gregorian/2567`,
            response: {
              success: true,
              data: {
                buddhistEra: 2567,
                gregorian: 2024,
                difference: 543
              }
            }
          }
        },
        holidays: {
          'GET /api/holidays': {
            description: 'Get all holidays for a specific year (defaults to current year)',
            parameters: {
              year: 'Query parameter (optional) - Year in Gregorian calendar (1900-2100)'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays?year=2024`,
            response: {
              success: true,
              year: 2024,
              buddhistEra: 2567,
              total: 22,
              publicHolidays: 21,
              data: 'Array of holiday objects'
            }
          },
          'GET /api/holidays/date': {
            description: 'Get all holidays for a specific date',
            parameters: {
              date: 'Query parameter (required) - Date in YYYY-MM-DD format'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays/date?date=2024-04-15`,
            response: {
              success: true,
              date: '2024-04-15',
              isHoliday: true,
              count: 1,
              data: 'Array of holiday objects for that date'
            }
          },
          'GET /api/holidays/month': {
            description: 'Get all holidays for a specific month',
            parameters: {
              year: 'Query parameter (optional) - Year (defaults to current year)',
              month: 'Query parameter (optional) - Month 1-12 (defaults to current month)'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays/month?year=2024&month=4`,
            response: {
              success: true,
              year: 2024,
              month: 4,
              buddhistEra: 2567,
              monthName: 'មេសា',
              total: 3,
              data: 'Array of holiday objects'
            }
          },
          'GET /api/holidays/upcoming': {
            description: 'Get upcoming holidays from today',
            parameters: {
              limit: 'Query parameter (optional) - Number of holidays to return (1-100, default: 10)'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays/upcoming?limit=5`,
            response: {
              success: true,
              limit: 5,
              count: 5,
              data: 'Array of upcoming holiday objects sorted by date'
            }
          },
          'GET /api/holidays/check': {
            description: 'Quick check if a specific date is a holiday',
            parameters: {
              date: 'Query parameter (required) - Date in YYYY-MM-DD format'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays/check?date=2024-04-15`,
            response: {
              success: true,
              date: '2024-04-15',
              isHoliday: true,
              holidays: 'Array of simplified holiday objects'
            }
          },
          'GET /api/holidays/public': {
            description: 'Get only public holidays (excludes religious observances that are not public holidays)',
            parameters: {
              year: 'Query parameter (optional) - Year (defaults to current year)'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays/public?year=2024`,
            response: {
              success: true,
              year: 2024,
              buddhistEra: 2567,
              total: 21,
              data: 'Array of public holiday objects only'
            }
          },
          'GET /api/holidays/religious': {
            description: 'Get only religious and holy days',
            parameters: {
              year: 'Query parameter (optional) - Year (defaults to current year)'
            },
            example: `${req.protocol}://${req.get('host')}/api/holidays/religious?year=2024`,
            response: {
              success: true,
              year: 2024,
              buddhistEra: 2567,
              total: 4,
              data: 'Array of religious/holy day objects only'
            }
          }
        }
      },
      holidayTypes: {
        public: 'Public holidays - Official government holidays',
        religious: 'Religious observances - Buddhist religious days',
        holy: 'Holy days - Major Buddhist holy days'
      },
      includedHolidays: {
        total: 22,
        publicHolidays: [
          'New Year (Jan 1)',
          'Victory over Genocide Day (Jan 7)',
          'International Women Day (Mar 8)',
          'Khmer New Year (Apr 14-16)',
          'Labour Day (May 1)',
          "King's Birthday (May 14)",
          'Royal Plowing Ceremony (May 15)',
          "King's Mother's Birthday (Jun 18)",
          'Pchum Ben Festival (Sep 21-23)',
          'Constitutional Day (Sep 24)',
          "Commemoration Day of King's Father (Oct 15)",
          "King's Coronation Day (Oct 29)",
          'Water Festival Ceremony (Nov 4-6)',
          'Independence Day (Nov 9)',
          'Peace Day (Dec 29)'
        ],
        religiousHolidays: [
          'Visak Bochea Day (May 11)',
          'Pchum Ben Festival (Sep 21-23)'
        ]
      },
      usage: {
        quickStart: [
          '1. Check API health: GET /api/health',
          '2. Get current date: GET /api/current',
          '3. Get all holidays: GET /api/holidays?year=2024',
          '4. Check specific date: GET /api/holidays/date?date=2024-04-15'
        ],
        examples: {
          curl: [
            'curl http://localhost:3000/api/current',
            'curl "http://localhost:3000/api/holidays?year=2024"',
            'curl "http://localhost:3000/api/holidays/date?date=2024-04-15"'
          ],
          javascript: [
            "const response = await fetch('http://localhost:3000/api/current');",
            "const data = await response.json();"
          ]
        }
      },
      support: {
        documentation: 'See README.md for detailed documentation',
        architecture: 'See ARCHITECTURE.md for Clean Architecture details',
        version: '1.0.0',
        lastUpdated: '2024'
      }
    });
  });

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Khmer Calendar API',
      architecture: 'Clean Architecture'
    });
  });

  app.use('/api', createCalendarRoutes(dependencies.calendarController));
  app.use('/api/holidays', createHolidayRoutes(dependencies.holidayController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;

