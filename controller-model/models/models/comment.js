const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const CommentSchema = new mongoose.Schema({
    content:String,
    author:{
        id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'User'
        },
        username:String
    },
    time: Date,
    mention:[{
        user:[{
            id:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'User'
            },
            username:String
        }]
    }]
 
})
// PhotoSchema.plugin(passportLocalMongoose)
module.exports= mongoose.model('Comment',CommentSchema)