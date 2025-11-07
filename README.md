# Cambodia Khmer Calendar API

A comprehensive national RESTful API built with Express.js for Cambodia, featuring Khmer calendar system, Buddhist Era date conversions, and complete holiday/holy day information for public and religious observances.

## 🏗️ Architecture

This project follows **Clean Architecture** principles, organizing code into distinct layers:

```
src/
├── domain/              # Domain Layer (Core Business Logic)
│   ├── entities/        # Business entities (Holiday, CalendarDate)
│   ├── repositories/    # Repository interfaces
│   └── services/        # Domain services (KhmerCalendarService)
│
├── application/         # Application Layer (Use Cases)
│   └── use-cases/       # Business use cases
│
├── infrastructure/      # Infrastructure Layer (External Concerns)
│   ├── repositories/    # Repository implementations
│   ├── routes/          # Express routes
│   └── middleware/      # Express middleware
│
├── presentation/        # Presentation Layer (Controllers)
│   └── controllers/     # HTTP controllers
│
└── di/                  # Dependency Injection
    └── container.js     # DI container
```

### Layer Responsibilities

- **Domain Layer**: Core business logic, entities, and domain rules. No dependencies on external frameworks.
- **Application Layer**: Orchestrates domain objects to perform application tasks (use cases).
- **Infrastructure Layer**: Implements technical details (database, HTTP, file system).
- **Presentation Layer**: Handles HTTP requests/responses and delegates to use cases.

### Benefits

- ✅ **Separation of Concerns**: Each layer has a single responsibility
- ✅ **Testability**: Easy to unit test each layer independently
- ✅ **Maintainability**: Changes in one layer don't affect others
- ✅ **Scalability**: Easy to add new features or swap implementations
- ✅ **Dependency Inversion**: High-level modules don't depend on low-level modules

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Khmer Calendar API"
}
```

#### 2. Get Current Date (Khmer Format)
```http
GET /api/current
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gregorian": {
      "year": 2024,
      "month": 1,
      "day": 15,
      "dayName": "ថ្ងៃច័ន្ទ"
    },
    "buddhistEra": {
      "year": 2567,
      "month": 1,
      "day": 15,
      "monthName": "មករា",
      "dayName": "ថ្ងៃច័ន្ទ"
    },
    "formatted": {
      "khmer": "ថ្ងៃច័ន្ទ ថ្ងៃទី 15 មករា ឆ្នាំ 2567",
      "english": "Monday 15 មករា 2567 BE"
    }
  }
}
```

#### 3. Convert Date to Khmer Format (GET)
```http
GET /api/convert?date=2024-01-15
```

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format

**Response:** Same format as `/api/current`

#### 4. Convert Date to Khmer Format (POST)
```http
POST /api/convert
Content-Type: application/json

{
  "date": "2024-01-15"
}
```

**Response:** Same format as `/api/current`

#### 5. Get Khmer Month Names
```http
GET /api/months
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "index": 1,
      "khmer": "មករា",
      "english": "January"
    },
    ...
  ]
}
```

#### 6. Get Khmer Day Names
```http
GET /api/days
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "index": 0,
      "khmer": "ថ្ងៃអាទិត្យ",
      "english": "Sunday"
    },
    ...
  ]
}
```

#### 7. Convert Year to Buddhist Era
```http
GET /api/buddhist-era/2024
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gregorian": 2024,
    "buddhistEra": 2567,
    "difference": 543
  }
}
```

#### 8. Convert Buddhist Era to Gregorian
```http
GET /api/gregorian/2567
```

**Response:**
```json
{
  "success": true,
  "data": {
    "buddhistEra": 2567,
    "gregorian": 2024,
    "difference": 543
  }
}
```

### Holiday Endpoints

#### 9. Get All Holidays for a Year
```http
GET /api/holidays?year=2024
```

**Query Parameters:**
- `year` (optional): Year in Gregorian calendar (defaults to current year)

**Response:**
```json
{
  "success": true,
  "year": 2024,
  "buddhistEra": 2567,
  "total": 25,
  "publicHolidays": 20,
  "data": [
    {
      "month": 1,
      "day": 1,
      "nameKh": "ទិវាចូលឆ្នាំសកល",
      "nameEn": "International New Year Day",
      "type": "public",
      "isPublicHoliday": true,
      "date": "2024-01-01",
      "year": 2024,
      "buddhistEra": 2567
    },
    ...
  ]
}
```

#### 10. Get Holidays for a Specific Date
```http
GET /api/holidays/date?date=2024-04-15
```

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format

**Response:**
```json
{
  "success": true,
  "date": "2024-04-15",
  "isHoliday": true,
  "count": 1,
  "data": [
    {
      "month": 4,
      "day": 15,
      "nameKh": "ពិធីបុណ្យចូលឆ្នាំខ្មែរ",
      "nameEn": "Khmer New Year",
      "type": "public",
      "isPublicHoliday": true,
      "date": "2024-04-15",
      "year": 2024,
      "buddhistEra": 2567
    }
  ]
}
```

#### 11. Get Holidays for a Month
```http
GET /api/holidays/month?year=2024&month=4
```

**Query Parameters:**
- `year` (optional): Year in Gregorian calendar (defaults to current year)
- `month` (optional): Month number 1-12 (defaults to current month)

**Response:**
```json
{
  "success": true,
  "year": 2024,
  "month": 4,
  "buddhistEra": 2567,
  "monthName": "មេសា",
  "total": 4,
  "data": [...]
}
```

#### 12. Get Upcoming Holidays
```http
GET /api/holidays/upcoming?limit=10
```

**Query Parameters:**
- `limit` (optional): Number of holidays to return (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "limit": 10,
  "count": 10,
  "data": [...]
}
```

#### 13. Check if Date is a Holiday
```http
GET /api/holidays/check?date=2024-04-15
```

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format

**Response:**
```json
{
  "success": true,
  "date": "2024-04-15",
  "isHoliday": true,
  "holidays": [
    {
      "nameKh": "ពិធីបុណ្យចូលឆ្នាំខ្មែរ",
      "nameEn": "Khmer New Year",
      "type": "public",
      "isPublicHoliday": true
    }
  ]
}
```

#### 14. Get Only Public Holidays
```http
GET /api/holidays/public?year=2024
```

**Query Parameters:**
- `year` (optional): Year in Gregorian calendar (defaults to current year)

**Response:** Same format as `/api/holidays` but filtered to only public holidays

#### 15. Get Only Religious/Holy Days
```http
GET /api/holidays/religious?year=2024
```

**Query Parameters:**
- `year` (optional): Year in Gregorian calendar (defaults to current year)

**Response:** Same format as `/api/holidays` but filtered to only religious and holy days

## 📅 Included Holidays

### Public Holidays
- International New Year Day (January 1)
- Victory Day over Genocide (January 7)
- Constitution Day (February 7)
- International Women's Day (March 8)
- Khmer New Year (April 14-17)
- International Labour Day (May 1)
- Royal Ploughing Ceremony (May 14)
- Day of Remembrance (May 20)
- International Children's Day (June 1)
- King's Birthday (June 18)
- Constitutional Day (September 24)
- Pchum Ben Day (October 15)
- Coronation Day (October 29)
- Independence Day (November 9-11)
- International Human Rights Day (December 10)

### Buddhist Holy Days
- Magha Puja Day (មាឃបូជា)
- Visakha Bochea Day (វិសាខបូជា)
- Asalha Puja Day (អាសាឍបូជា)
- Buddhist Lent Day (ចូលវស្សា)
- Pchum Ben (ភ្ជុំបិណ្ឌ)
- End of Buddhist Lent (ចេញវស្សា)
- Kantin Day (បុណ្យកាន់បិណ្ឌ)
- Water Festival (បុណ្យអុំទូក)

## 🧪 Example Usage

### Using cURL

```bash
# Get current date
curl http://localhost:3000/api/current

# Convert specific date
curl http://localhost:3000/api/convert?date=2024-01-15

# Convert year to Buddhist Era
curl http://localhost:3000/api/buddhist-era/2024

# Get all holidays for 2024
curl http://localhost:3000/api/holidays?year=2024

# Check if a date is a holiday
curl http://localhost:3000/api/holidays/check?date=2024-04-15

# Get upcoming holidays
curl http://localhost:3000/api/holidays/upcoming?limit=5

# Get holidays for April 2024
curl http://localhost:3000/api/holidays/month?year=2024&month=4
```

### Using JavaScript (Fetch)

```javascript
// Get current date (includes holiday info)
const response = await fetch('http://localhost:3000/api/current');
const data = await response.json();
console.log(data);

// Convert date (includes holiday info)
const convertResponse = await fetch('http://localhost:3000/api/convert?date=2024-04-15');
const convertData = await convertResponse.json();
console.log(convertData);

// Get all holidays for a year
const holidaysResponse = await fetch('http://localhost:3000/api/holidays?year=2024');
const holidaysData = await holidaysResponse.json();
console.log(holidaysData);

// Check if today is a holiday
const checkResponse = await fetch('http://localhost:3000/api/holidays/check?date=2024-04-15');
const checkData = await checkResponse.json();
console.log(checkData);

// Get upcoming holidays
const upcomingResponse = await fetch('http://localhost:3000/api/holidays/upcoming?limit=10');
const upcomingData = await upcomingResponse.json();
console.log(upcomingData);
```

## 📝 Features

### Calendar Features
- ✅ Buddhist Era (BE) date conversion
- ✅ Khmer month and day names
- ✅ Formatted date strings in Khmer
- ✅ Date conversion with holiday detection

### Holiday Features
- ✅ Complete list of Cambodia public holidays
- ✅ Buddhist holy days and religious observances
- ✅ Holiday lookup by date, month, or year
- ✅ Upcoming holidays query
- ✅ Public vs religious holiday filtering
- ✅ Holiday information in Khmer and English

### API Features
- ✅ RESTful API design
- ✅ CORS enabled
- ✅ Comprehensive error handling
- ✅ Health check endpoint
- ✅ National calendar ready for production use

## 🛠️ Technology Stack

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Clean Architecture** - Software architecture pattern

## 📋 API Design Choice: REST

This API uses **REST** architecture because:

1. **Simplicity** - Easy to understand and implement
2. **Standard HTTP** - Works with all HTTP clients
3. **Cacheable** - HTTP caching works out of the box
4. **Stateless** - Each request is independent
5. **Widely Supported** - Works with any programming language
6. **Perfect for CRUD** - Ideal for calendar/date operations

### Why not GraphQL?
- Calendar operations are straightforward and don't need complex querying
- Adds unnecessary complexity for simple date conversions
- Overkill for this use case

### Why not gRPC?
- Requires binary protocol and more complex setup
- Less web-friendly (needs HTTP/2 and special clients)
- Unnecessary for a calendar API that benefits from HTTP caching

## 📄 License

MIT

