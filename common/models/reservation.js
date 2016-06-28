const app = require('../../server/server');
const AvailabilityService = require('availability-service');
const options = {
  gapRules: [ 2, 3 ],
  idKey: 'campsiteId',
  startKey: 'startDate',
  endKey: 'endDate'
};
const availabilityService = new AvailabilityService(options);

module.exports = function(Reservation) {

  Reservation.availability = function (start, end, cb) {

    Reservation.find(function (err, reservations) {
      if (err) {
        throw err;
      }
      const availableSites = availabilityService.checkAvailability(start, end, reservations);
      if (availableSites.length > 0) {

        app.models.Campsite
          .find({ where: {id: {inq: availableSites}}}, function (err, campsites) {
            if (err) {
              throw err;
            }
            return cb(null, start, end, campsites);
          });

      } else {
        return cb(null, start, end, []);
      }
    });
  };

  Reservation.remoteMethod(
    'availability',
    {
      accepts: [
        { arg: 'startDate', type: 'string', required: true },
        { arg: 'endDate', type: 'string', required: true }
      ],
      description: 'Returns a collection of Campsites that have availability for given start and end dates',
      http: { path: '/availability', verb: 'post' },
      returns: [
        { arg: 'startDate', type: 'string' },
        { arg: 'endDate', type: 'string' },
        { arg: 'available_sites', type: 'array' }
      ]
    }
  );
};
