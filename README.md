## Example Implementation

To provide an example implementation, I created a Loopback API that exposes a route, `/reservations/availability`. This route is available for `POST` requests only, and requires two params: `startDate` and `endDate`. It returns a JSON collection of campsite objects that have availability for that date range.

To run the api, simply follow these steps:

1. Clone or download a copy of [campspot-api](https://github.com/djheru/campspot-api)
2. Edit `./server/datasources.json` and enter your credentials for a MySQL database and a database that you'd like to use for testing
3. Run `npm install` to install the dependencies (including this one, availability-service)
4. Run `node .` to start the server in a terminal session. This will create a database migration with the data from the provided JSON document (located in the file `./server/boot/test-case.js`)
5. Navigate to http://localhost:3000/explorer/#!/Reservation/Reservation_availability and enter the dates '2016-06-07' and '2016-06-10' in the provided text input fields, then submit.
6. Inspect the response body. You should see the following JSON object:

    ```
    {
      "startDate": "2016-06-07",
      "endDate": "2016-06-10",
      "available_sites": [
        { "name": "Daniel Boone Bungalow", "id": 5 },
        { "name": "Teddy Rosevelt Tent Site", "id": 6 },
        { "name": "Bear Grylls Cozy Cave", "id": 8 },
        { "name": "Wyatt Earp Corral", "id": 9 }
      ]
    }
    ```

## Conclusion
Thank you again for the opportunity. Please feel free to contact me if you have any additional questions or comments.
