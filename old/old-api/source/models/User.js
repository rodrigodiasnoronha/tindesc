const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: { type: String, required: true }, 
    username: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    key: String,
    size: Number,
    name_key: String,
    url: String,
    pic_path: String,
    gender: { type: String, default: "M"},
    bio: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
})

module.exports = model('User', UserSchema)