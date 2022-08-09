const db = require("../config/dbConfig");
const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");

exports.searchItems = CatchAsync(async (req, res, next) => {
  // req.query.search MUST match the front end url
  // example: localhost:3000/api/v1/search/items?SEARCH=value
  let searchTerm = req.query.search;
  //    if no searchTerm return success, and show all the restaurant results
  //    example: localhost:3000/api/v1/search/items?search=
  if (!searchTerm) {
    await db
      .query("SELECT * FROM restaurants WHERE isApproved = 1", [])
      .then(([results, fields]) => {
        res.json({
          status: "success",
          message:
            "No search term was given, so we're showing all the results!",
          results: results,
        });

      })
      .catch((err) => {
        return next(new AppError(err, 500));
      });
  } else {
    //   if searchTerm does exist run our baseSQL statement and show the results
    //  example: localhost:3000/api/v1/search/items?search=korean
    let baseSQL =
      "SELECT * FROM restaurants HAVING concat_ws(' ', restaurant_name, cuisine_type  ) like ? AND isApproved = 1;";
    let searches = "%" + searchTerm + "%";
    await db
      .execute(baseSQL, [searches])
      .then(([results, fields]) => {
        if (results && results.length) {
          res.json({
            status: "success",
            message: `${results.length} results found`,
            results: results,
          });

          /*   WILL PRINT
            {
            "status": "success",
            "message": "1 results found",
            "results": [
                {
                    "id": 4,
                    "restaurant_name": "K-blast",
                    "restaurant_logo": "https://res.cloudinary.com/dis7ep3yq/image/upload/v1616095822/korean_b17ap5.jpg",
                    "cuisine_type": "Korean",
                    "haystack": "K-blast Korean"
                }
            ]
        }
        */
        } else {
          // if no results were found, just show all of the restaurants results
          // example:localhost:3000/api/v1/search/items?search=gf
          db.query("SELECT * FROM restaurants WHERE isApproved = 1", []).then(
            ([results, fields]) => {
              res.json({
                status: "success",
                message:
                  "Results not found, but checkout our latest restaurants!",
                results: results,
              });
            }
          );

          //   WILL PRINT
          // All of the  restaurants in our database
        }
      })
      .catch((err) => {
        return next(new AppError(err, 500));
      });
  }
});
