import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required for creating a user"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid Email address"],
    unique: [true, "Email already exists."]
  },
  name: {
    type: String,
    required: [true, "name is required for creating the account."]
  },
  password: {
    type: String,
    required: [true, "Password is required for creating an account."],
    minlength: [6, "Password should contain at least 6 characters."],
    select: false
  }
}, {
  timestamps: true
})

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
  }
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userSchema)

export default userModel;