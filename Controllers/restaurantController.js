import Restaurant from "../Models/restaurantModel.js";

// 👉 Safe JSON Parser
const safeParse = (field, fallback = undefined) => {
  try {
    return field ? JSON.parse(field) : fallback;
  } catch {
    return fallback;
  }
};



// 👉 Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    console.log("📸 Uploaded Files:", req.files);
    console.log("📦 Body:", req.body);

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    // let images = [];
    // if(req.files?.images){
    //   images=req.file.map((file)=>file.path);
    // }

    // ✅ Multiple Images
    console.log(images)
    
    const restaurant = new Restaurant({
      userId: req.user.id, // from auth middleware
      name: req.body.name,
      description: req.body.description,
      images,
      location: safeParse(req.body.location), // {address, city, pincode...}
      cuisine: req.body.cuisine,
      category: req.body.category,
      deliveryTime: req.body.deliveryTime,
      timing: safeParse(req.body.timing), // {open, close}
      offers: safeParse(req.body.offers, []),
      isPureVeg: req.body.isPureVeg || false,
      popularDishes: req.body.popularDishes || "",
      tags: safeParse(req.body.tags, []),
    });

    await restaurant.save();

    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("❌ Error while creating restaurant:", error);
    // 👇 Yaha lagana hai
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Get All Restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("items");
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Get Restaurant By ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "items"
    );
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("❌ Error fetching restaurant:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Update Restaurant
const updateRestaurant = async (req, res) => {
  try {
    console.log("📝 Update Body:", req.body);
    console.log("📸 Update Files:", req.files);

    const updateData = {
      ...req.body,
      location: safeParse(req.body.location),
      timing: safeParse(req.body.timing),
      offers: safeParse(req.body.offers, []),
      tags: safeParse(req.body.tags, []),
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("❌ Error updating restaurant:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// 👉 Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    res.json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting restaurant:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
