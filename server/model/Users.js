const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false // Exclude password from queries by default
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});
const UserModel = mongoose.model("user", UsersSchema);
module.exports = UserModel;
