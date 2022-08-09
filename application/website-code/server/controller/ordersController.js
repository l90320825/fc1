const db = require("../config/dbConfig");
const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");

exports.getAllPickupOrders = CatchAsync(async (req, res, next) => {
  await db.query("SELECT * FROM pickup_orders;").then(([results, fields]) => {
    if (results && results.length == 0) {
      return next(new AppError("No pickup items were found!", 200));
    } else {
      return res.json({
        status: "success",
        message: `${results.length} pickup items were successfully found`,
        orders: results,
      });
    }
  });
});
exports.getAllDeliveryOrders = CatchAsync(async (req, res, next) => {
  await db.query("SELECT * FROM delivery_orders;").then(([results, fields]) => {
    if (results && results.length == 0) {
      return next(new AppError("No delivery items were found!", 200));
    } else {
      return res.json({
        status: "success",
        message: `${results.length} delivery items were successfully found`,
        orders: results,
      });
    }
  });
});

exports.getDeliveryOrderDetails = CatchAsync(async (req, res, next) => {
  await db.query("SELECT delivery_orders.*, orderItems.* FROM delivery_orders JOIN orderItems ON orderItems.fk_deliverer_order_id = delivery_orders.id WHERE delivery_orders.id = ?;", [req.query.id])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return next(new AppError("No delivery items were found!", 200));
      } else {
        return res.json({
          status: "success",
          message: `${results.length} delivery items were successfully found`,
          orders: results,
        });
      }
    });
});

exports.getPickupOrderDetails = CatchAsync(async (req, res, next) => {
  await db.query("SELECT pickup_orders.*, orderItems.* FROM pickup_orders JOIN orderItems ON orderItems.fk_pickup_order_id = pickup_orders.id WHERE pickup_orders.id = ?;", [req.query.id])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return next(new AppError("No pickup items were found!", 200));
      } else {
        return res.json({
          status: "success",
          message: `${results.length} delivery items were successfully found`,
          orders: results,
        });
      }
    });
});

exports.createPickupOrders = CatchAsync(async (req, res, next) => {
  // still need to realte this back to all three foreign keys
  const { price, restaurantName, pickup_address, time, userID, restaurantID } = req.body;
  let baseSQL =
    "INSERT INTO pickup_orders ( RestaurantName, price, pickup_address, created, fk_user_id, fk_restaurant_id, time) VALUES (?,?,?,now(),?,?, ?);";
  await db
    .execute(baseSQL, [restaurantName, price, pickup_address, userID, restaurantID, time])
    // for delivery/pickup: front end needs to do a testing case to see which option the user chose
    // if user picks delivery option, block pickup, vice versa
    .then(async ([results, fields]) => {
      if (results && results.affectedRows) {
        let x = results.insertId
        await db
          .query("SELECT LAST_INSERT_ID();", [])
          .then(([results, fields]) => {
            return res.json({
              status: "success",
              message: "Your pickup order has been received!",
              orders: [
                {
                  id: x,
                  price: price,
                  pickup_address: pickup_address,
                },
              ],
            });
          })
      }
    })
    .catch((err) => {
      return next(new AppError(err), 500);
    });
});
exports.createDeliveryOrders = CatchAsync(async (req, res, next) => {
  // still need to realte this back to all three foreign keys
  const {price, restaurantName, delivery_address, userID, restaurantID, time, restaurantAddress } = req.body;
  let baseSQL =
    "INSERT INTO delivery_orders (RestaurantName, price, delivery_address, created, fk_user_id, fk_restaurant_id, time, RestaurantAddress) VALUES (?,?,?,now(),?,?, ?, ?);";
  await db
    .execute(baseSQL, [restaurantName, price, delivery_address, userID, restaurantID, time, restaurantAddress])
    // for delivery/pickup: front end needs to do a testing case to see which option the user chose
    // if user picks delivery option, block pickup, vice versa
    .then(async ([results, fields]) => {
      if (results && results.affectedRows) {
        let x = results.insertId
        await db
          .query("SELECT LAST_INSERT_ID();", [])
          .then(([results, fields]) => {
            /*for (var key in results[0]) {
              insertId = results[0][key]
            }*/
            return res.json({
              status: "success",
              message: "Your delivery order has been received!",
              orders: [
                {
                  id: x,
                  price: price,
                  delivery_address: delivery_address,
                },
              ],
            });
          })
      }
    })
    .catch((err) => {
      return next(new AppError(err), 500);
    });
});

exports.setOrderItems = CatchAsync(async (req, res, next) => {
  const { itemNames, counts, P_or_D, order_id } = req.body;
  console.log("cant run?")
  if (P_or_D == "P") {
    for (let i = 0; i < itemNames.length; i++) {
      let baseSQL =
        "INSERT INTO orderItems VALUES (?,?,?,?,?,?);";
      await db
        .execute(baseSQL, [null, order_id, null, null, counts[i], itemNames[i]])
        .then(([results, fields]) => {
          if (results && results.affectedRows) {
          }
        })
        .catch((err) => {
          return next(new AppError(err), 500);
        });
    }
    return res.json({
      status: "success",
      message: "Your pickup order items were received!",
    });
  } else {
    for (let i = 0; i < itemNames.length; i++) {
      let baseSQL =
        "INSERT INTO orderItems VALUES (?,?,?,?,?,?);";
      await db
        .execute(baseSQL, [null, null, null, order_id, counts[i], itemNames[i]])
        .then(([results, fields]) => {
          if (results && results.affectedRows) {
          }
        })
        .catch((err) => {
          return next(new AppError(err), 500);
        });
    }
    return res.json({
      status: "success",
      message: "Your delivery order items were received!",
    });
  }
});

exports.setOrderDeliverer = CatchAsync(async(req,res,next)=>{
  //const { orderid, delivererid } = req.body;
  //restaurant id
  const orderid = req.query.orderid
  const delivererid = req.query.delivererid
  let searchSql = "UPDATE delivery_orders SET fk_deliverer_id = ? WHERE id = ? AND fk_deliverer_id IS NULL"

  await db.execute(searchSql,[delivererid, orderid]).then(([results,fields])=>{
    //if the SELECT statement does not find anything
    if(results && results.length == 0){
      return next(new AppError("unable to set deliverer",200));
    }
    else{
      return res.json({
        status:"success",
        order: results
      })
    }
  })
  .catch((err) => {
    return next(new AppError(err), 500);
  });
})

exports.getDeliveryOrdersForDeliverer = CatchAsync(async (req, res, next) => {
  await db.query("SELECT * FROM delivery_orders WHERE fk_deliverer_id = ?;", [req.query.id])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return next(new AppError("No delivery items were found!", 200));
      } else {
        return res.json({
          status: "success",
          message: `${results.length} delivery items were successfully found`,
          orders: results,
        });
      }
    });
});

exports.removeDeliveryOrder = CatchAsync(async(req,res,next)=>{
  const id = req.query.id;
  
  let searchSql = "SELECT * FROM delivery_orders WHERE id = ?"
  let deleteSql = "DELETE FROM delivery_orders where id = ?"
  
  await db.execute(searchSql,[id]).then(([results,fields]) => {
    //if the SELECT statement does not find anything 
    if(results && results.length == 0){
      return next(new AppError("No orders with that id were found", 200));
    } 
    //if the SELECT statement does find something, execute the delete
    else{
      db.execute(deleteSql,[id])
      return res.json({
        status: "success",
        message: "Item was deleted"
      });
    }
  }) 
})

exports.removePickupOrder = CatchAsync(async(req,res,next)=>{
  const id = req.query.id;
  
  let searchSql = "SELECT * FROM pickup_orders WHERE id = ?"
  let deleteSql = "DELETE FROM pickup_orders where id = ?"
  
  await db.execute(searchSql,[id]).then(([results,fields]) => {
    //if the SELECT statement does not find anything 
    if(results && results.length == 0){
      return next(new AppError("No orders with that id were found", 200));
    } 
    //if the SELECT statement does find something, execute the delete
    else{
      db.execute(deleteSql,[id])
      return res.json({
        status: "success",
        message: "Item was deleted"
      });
    }
  }) 
})