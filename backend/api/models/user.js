const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { string } = require("joi");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    address:
    [{
        type: String,
        trim: true,
    }],
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    }],
},
{
    timestamps: true,
}
);


userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString(), role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" }
    );
    return token;
}

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports =  mongoose.model("User", userSchema);