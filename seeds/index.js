
const mongoose = require('mongoose');
const cities = require('./citis');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '63cb7c75afbdc4845d9470ee',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)}${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus aspernatur fugiat impedit libero, culpa dolorem magnam accusantium nostrum facilis. Perspiciatis assumenda, provident harum blanditiis dolores eos doloribus quos nisi ipsam.',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      image: [{
        url: 'https://res.cloudinary.com/djognfxr9/image/upload/v1674324646/YelpCamp/jjrs1uocoyboixtgvss9.jpg',
        filename: 'YelpCamp/jjrs1uocoyboixtgvss9'
      },
      {
        url: 'https://res.cloudinary.com/djognfxr9/image/upload/v1674324646/YelpCamp/jjrs1uocoyboixtgvss9.jpg',
        filename: 'YelpCamp/jjrs1uocoyboixtgvss9'
      }
      ]

    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});