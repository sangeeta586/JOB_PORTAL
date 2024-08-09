import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"; // make sure you have bcryptjs installed
import JWT from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: 'Bangalore'
    }
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10); // Use genSalt method of bcryptjs
    this.password = await bcrypt.hash(this.password, salt); // Use bcrypt.hash with this.password
    next();
});

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
}

//json token
userSchema.methods.createJWT = function(){
    return JWT.sign({userId : this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
export default mongoose.model("User", userSchema);
