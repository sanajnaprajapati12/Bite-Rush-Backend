import Item from "../Models/Item.js";
import Restaurant from  "../Models/restaurantModel.js";

// 👉 Create Item
const createItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => file.path);
  }

    const {
      itemName,
      price,
      description,
      discount,
      itemRating,
      totalRating,
     
      size,
      quantity,
    } = req.body || {};

    if (!itemName) {
      return res
        .status(400)
        .json({ success: false, message: "itemName is required" });
    }

    // 1. Create item
    const newItem = new Item({
      images,
      itemName,
      price,
      description,
      discount,
      itemRating,
      totalRating,
      size,
      quantity,
    });
    await newItem.save();

    // 2. Push into restaurant
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { items: newItem._id } },
      { new: true }
    ).populate("items");

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(201).json({
      success: true,
      message: "Item created and added to restaurant",
      data: { item: newItem, restaurant },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Get Item by ID
const getItemsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId).populate(
      "items"
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, items: restaurant.items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// 👉 Update Itema
const updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.path;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const deleteItem = async (req, res) => {
   try {
     const { itemId } = req.params;
     const item = await Item.findById(itemId);
     if (!item)
       return res
         .status(404)
         .json({ success: false, message: "Item not found" });

     await item.deleteOne();
     res.json({ success: true, message: "Item deleted successfully" });
   } catch (err) {
     res.status(500).json({ success: false, message: "Server error" });
   }
 };

export default { createItem, getAllItems, getItemsByRestaurantId, updateItem, deleteItem };
