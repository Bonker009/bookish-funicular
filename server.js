require('dotenv').config();
const createApp = require('./src/infrastructure/app');
const DIContainer = require('./src/di/container');

const PORT = process.env.PORT || 3000;

const container = new DIContainer();
const dependencies = container.getDependencies();

const app = createApp(dependencies);

app.listen(PORT, () => {
  console.log(`🚀 Khmer Calendar API server is running on port ${PORT}`);
  console.log(`📍 Access the API at http://localhost:${PORT}`);
  console.log(`📖 API documentation: http://localhost:${PORT}/`);
  console.log(`🏗️  Architecture: Clean Architecture`);
});

module.exports = app;
