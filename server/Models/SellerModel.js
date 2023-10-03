import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      max: 70,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    storename: {
        type: String,
        required: true,
      },
    password: {
      type: String,
      // required: true,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    verified: {
      type: Boolean,
      // required: true,
      default: false,
    },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //     },
    //     coordinates: {
    //         type: [Number],
    //         index: "2dsphere",
    //         required: false
    //     },
    //     formattedAddress: String
    // },
  },
  {
    timestamps: true,
  }
);

// Login
sellerSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Seller = mongoose.model("Seller", sellerSchema);



export default Seller;