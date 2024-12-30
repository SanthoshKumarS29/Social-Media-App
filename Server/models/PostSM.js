import mongoose from 'mongoose';

const smSchema = new mongoose.Schema({
    title: String,
    content : String,
    file: String,
    likes: {
        type: Number, default: 0
    },
    comment: [{
        text: String
    }],
})

export const MediaItems = mongoose.model('MediaItems', smSchema);