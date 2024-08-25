const mongoose = require('mongoose');

// Specify the database name (Foodie) in the connection string
const mongoURI = 'mongodb+srv://Ankushjain:ankush234@atlascluster.dbkc8.mongodb.net/foodmern?retryWrites=true&w=majority&appName=AtlasCluster';

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB and the Foodie database");

    // Fetch the food_items collection
    const fetched_data = mongoose.connection.db.collection("food_items");

    // Convert the cursor to an array
    const data = await fetched_data.find({}).toArray();
    const foodCategory= mongoose.connection.db.collection("foodcategory");

    const data1 = await foodCategory.find({}).toArray();
    // console.log(data);
    global.food_items=data;
    global.foodCategory=data1;
  //  console.log(global.food_items);

  } catch (err) {
    console.error("Error while connecting to MongoDB or fetching data:", err.message);
  }
};

module.exports = mongoDB;
