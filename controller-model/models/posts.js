const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const PostsSchema = new mongoose.Schema({
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    title:String,
    image:String,
    description:String,
    create:Date,
    liked:[{
        likedBy:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'User'
        },
        time:Date
    }],
    comment:[{
        time:Date,
        author:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'User'
        },
        mention:[{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'User'
        }],
        content:String
    }],
    tag:[String]
})



module.exports= mongoose.model('Posts',PostsSchema)