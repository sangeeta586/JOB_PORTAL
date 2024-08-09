import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Company name is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    //minlength: 100, // Adjust this to a reasonable minimum length for a position title
  },
  status: {
    type: String,
    enum: ["pending", "reject", "interview"],
    default: "pending",
  },
  workType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "contract"],
  },
  workLocation: {
    type: String,
    default: "Bangalore",
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
