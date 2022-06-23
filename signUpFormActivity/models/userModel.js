const mongoose=require('mongoose');
const emailValidator=require("email-validator");
const bcrypt = require('bcrypt');


const db_link='mongodb+srv://admin:v7owLvq06TEtGTaD@cluster0.bvg1dkr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
}).catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength:10
    },
    consfirmPassword:{
        type:String,
        required: true,
        minLength:10,
        validate:function(){
            return this.consfirmPassword == this.password;
        }
    },
    role:{
        type: String,
        enum:['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage:{
        type: String,
        default: 'img/users/default.jpeg'
    }

});



userSchema.pre('save', function(){
this.consfirmPassword=undefined;
})

// userSchema.pre('save', async function(){
//     let salt= await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password=hashedString;
// })
const userModel=mongoose.model('userModel', userSchema);
module.exports=userModel;
