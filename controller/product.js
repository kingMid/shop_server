const  Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');//通过node读取本地文件


//写入数据
router.get('/insertProductInfo',async (ctx)=>{
    fs.readFile('./data/product.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        console.log(data);
        let count = 0;//计数器
        const Product = mongoose.model('Product');
        data.map((value,index)=>{
            console.log(value);
            let product = new Product(value);
            product.save().then(()=>{
                count ++;
                console.log("成功",count);
                
            }).catch(err=>{
                console.log("写入数据失败！");    
            })
        });
    });
    ctx.body = '导入数据';
});



router.get('/getProductsByType',async (ctx)=>{

    //获取model
    const Product = mongoose.model('Product');
    await Product.find({type:ctx.query.type}).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res=>{
        ctx.body = res;
    })
   
     
 });

module.exports =  router;