const sampleData = require('./test-case');

module.exports = function (app) {
  const ds = app.dataSources.mysqlDS;
  ds.automigrate('Campsite', function (err) {
    if (err) {
      throw err;
    }

    app.models.Campsite.create(sampleData.campsites, function (err, campsites) {
      if (err) {
        throw err;
      }
      // console.log('Campsites created: ', campsites);

      ds.automigrate('Reservation', function (err) {
        if (err) {
          throw err;
        }

        app.models.Reservation.create(sampleData.reservations, function (err, reservations) {
          if (err) {
            throw err;
          }
          // console.log('Reservations created: ', reservations)
        });
      });
    });
  });
};

