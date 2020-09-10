const Koa = require('koa');
const app = new Koa();


//解决跨域问题
const cors = require('koa2-cors');
app.use(cors());

//接受前端post请求
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());



//加载路由
const Router = require('koa-router');
let user = require('./controller/user.js');
let product = require('./controller/product.js');
let type = require('./controller/type.js');
let cart = require('./controller/cart.js');

let router = new Router();
router.use('/user',user.routes());
router.use('/product',product.routes());
router.use('/type',type.routes());
router.use('/cart',cart.routes());


app.use(router.routes());
app.use(router.allowedMethods());//只允许特定的请求方式

//导入init 
const {connect ,initSchemas} = require('./init.js');
(async () =>{
   await connect();//开启数据库
    initSchemas();//引入模型
})();





app.use(async (ctx)=>{
    ctx.body = 'hello 111'
})
//开启3000端口服务
app.listen(3000,()=>{
    console.log('start shop server');
})