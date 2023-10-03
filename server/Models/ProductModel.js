import mongoose from "mongoose";


const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


// locationSchema.index({location: "2dsphere"});

const productSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    name: {
      type: String,
      required: [true, "Please enter product name"]
    },
    storename: {
      type: String,
      required: [true, "Please enter product name"]
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Please enter description"]
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "Please enter stock price"],
      default: 0,
    },
    // product: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // address: {
    //   type: String,
    //   required: [true, "Please add address"]
    // },
    // location: {
    //   type: {
    //     type: String,
    //     enum: ['Point'],
    //   },
    //   coordinates: {
    //     type: [Number],
    //     index: "2dsphere",
    //     required: true
    //   },
    //   formattedAddress: String
    // },
    
  },
  {
    timestamps: true,
  }
);



const Product = mongoose.model("Product", productSchema);

export default Product;
