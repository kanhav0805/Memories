//import the mongoose file
import mongoose from "mongoose";

//now we will build the user schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

//now we will create a mongoose model using the schema
export default mongoose.model("User", userSchema);
