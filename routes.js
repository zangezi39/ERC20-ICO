const routes = require('next-routes')();

routes
  .add('/invest/:address', '/invest/summary')


module.export = routes;
