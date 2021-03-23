import db from './models/index.mjs';

// import your controllers here
import initBugController from './controllers/bugController.mjs';
import initFeatureController from './controllers/featureController.mjs';
import initUserController from './controllers/userController.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugController = initBugController(db);
  const featureController = initFeatureController(db);
  const userController = initUserController(db);
  // define your route matchers here using app
  app.get('/', bugController.index);
  app.get('/features', featureController.featureList);
  app.post('/login', userController.login);
  app.post('/newBug', bugController.newBug);
}
