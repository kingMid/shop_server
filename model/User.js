//与数据库打交道
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userId:Schema.Types.ObjectId,
    userName:{unique: true, type: String},
    password:String,
    createDate:{type: Date, default:Date.now()}
});

//在保存之前加密
userSchema.pre('save',function(next){
    //随机生成salt   10迭代次数
    bcrypt.genSalt(10,(err,salt)=>{
        if(err)   return  next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err)   return  next(err);  
            this.password = hash;
            next();
        })
    });
});

//比较密码
userSchema.methods = {
    comparePassword:(_password,password)=>{
        console.log(_password,password);
        
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User',userSchema);