// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// export default cloudinary
import dotenv from "dotenv";

dotenv.config();
import { v2 as cloudinary } from "cloudinary";


// ✅ Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// // 👇 yaha default export cloudinary object ka
// export default cloudinary;
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// dotenv.config();

// // ✅ Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// let storage;

// try {
//  const   storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder: "FeastoUploads", // Cloudinary folder name
//       allowed_formats: ["jpg", "jpeg", "png"],
//     },
//   });

//   console.log("✅ Cloudinary storage configured successfully");
// } catch (error) {
//   console.error("❌ CloudinaryStorage setup failed:", error.message);

//   // fallback: local storage
  
  
// }

// // ✅ Final multer middleware
// const parser = multer({ storage });

// export default parser;
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// dotenv.config();

// // ✅ Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ Multer Storage with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "FeastoUploads", // 👈 Cloudinary folder name
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });

// // ✅ Final multer middleware
// const parser = multer({ storage });

// export default parser;
