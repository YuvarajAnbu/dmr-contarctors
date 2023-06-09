const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event, context) => {
  try {
    const { next_cursor, limit } = JSON.parse(event.body);
    const result = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      // prefix: "test/", //folder
      max_results: limit,
      next_cursor: next_cursor,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
