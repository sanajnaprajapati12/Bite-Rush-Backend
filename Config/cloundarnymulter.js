

// storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/"); // local uploads folder
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });

// }

//   const parser = multer({ storage });

// // ✅ Multer with Cloudinary storage
// // const parser = multer({ storage });

//  export default parser;
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js";

// let storage;

// try {
//    const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder: "FeastoUploads",
//       allowed_formats: ["jpg", "jpeg", "png"],
//     },
//   });

//   console.log("✅ Cloudinary storage configured successfully");
// } catch (error) {
//   console.error("❌ CloudinaryStorage setup failed:", error.message);
// }
//   // fallback local storage
  
// }
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js";
// let storage
// // Multer Storage using Cloudinary
// try{
//  const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "FeastoUploads", // Cloudinary folder
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });
// console.log("✅ Cloudinary storage configured successfully");
// }
 
//  catch (error) {
//   console.error("❌ CloudinaryStorage setup failed:", error.message);
// }
// // Multer parser
// const parser = multer({ storage });

// export default parser;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

let storage; 

try {
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "FeastoUploads",
      allowed_formats: ["jpg", "jpeg", "png"],
    },
  });
  console.log("✅ Cloudinary storage configured successfully");
} catch (error) {
  console.error("❌ CloudinaryStorage setup failed:", error.message);
}

// Multer parser
const parser = multer({ storage });

export default parser;
