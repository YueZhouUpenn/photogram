const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const PostsSchema = new mongoose.Schema({
    //author:String,
    author:{
        id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'User'
        },
        username:String
    },
    title:String,
    image:String,
    description:String,
    create:Date,
    liked:[
        {
            likedBy:{
                id:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'User'
                },
                username:String
            },
            time:Date
        }
    ],
    comment:[{
        time:Date,
        author:{
            id:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'User'
            },
            username:String
        },
        mention:[{
            user:
                {
                    id:{
                        type:mongoose.SchemaTypes.ObjectId,
                        ref:'User'
                    },
                    username: String
                }
            }],
        content:String
    }],
    tag:[String]
})
// PhotoSchema.plugin(passportLocalMongoose)
module.exports= mongoose.model('Posts',PostsSchema)