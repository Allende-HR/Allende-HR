var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/inventory';

var inventory = require('../databases/testData/asos.json')

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongoDB - inventory database");
});

let itemSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  brandName: String,
  imageUrl: String,
  price: Number,
  timestamp: { type : Date, default: Date.now }
});

let Item = mongoose.model('Item', itemSchema);

let saveItem = (id, name, brandName, imageUrl, price) => {
  let newItem = new Item({
    id: id,
    name: name,
    brandName: brandName,
    imageUrl: imageUrl,
    price: price,
  });

  newItem.save((err) => {
    if (err) console.log(err);
    else console.log('Successfully saved data');
  });
}

let retrieveNewItems = (timestamp, callback) => {
  Item.find({timestamp: {$gte: timestamp}}, (err, newItems) => {
    if (err) {
      callback(err);
    } else {
      callback(null, newItems);
    }
  })
}

module.exports = {
  db,
  saveItem,
  retrieveNewItems
}