import requests from "./ajax";
//test
export const reqUsernames = () => requests({ url: '/Test/Usernames', method: 'get' });
//用户登录
export const reqUserinfo = (params) => requests({ url: '/UserService/UserLogin', method: 'post', params });
//用户注册
export const reqRegist = (params) => requests({ url: '/UserService/UserRegister', method: 'post', params });
//上架商品
export const reqAdd = (data) => requests({
    url: '/ProductController/OnSaleProduct',
    method: 'post',
    data,
    headers: {
        'Content-Type': 'multipart/form-data',
        'token': window.localStorage.getItem('key')
    }
});
//首页显示商品
export const reqAllGoods = () => requests({ url: '/ProductController/GetAllOnSaleProduct', method: 'get' });
//商品详情
export const reqAcc = (params) => requests({ url: '/ProductController/GetAccInfo', method: 'post', params });
//加购
export const reqBag = (params) => requests({
    url: '/ProductController/PutProductIntoShoppingCarts',
    method: 'post',
    params,
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//立即购买
export const reqBuy = (params) => requests({
    url: '/ProductController/PurchaseProduct',
    method: 'post',
    params,
    headers: {
        'token': window.localStorage.getItem('key')
    }
});

//购物车
export const reqBagInfo = () => requests({
    url: '/ShoppingCartController/Product_info',
    method: 'get',
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//购物车结算
export const reqBagPay = (data) => requests({
    url: '/ShoppingCartController/PurchaseProducts',
    method: 'post',
    data: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'token': window.localStorage.getItem('key')
    },
});
//搜索
export const reqSearch = (params) => requests({ url: '/ProductController/GetInfoByInfo', method: 'post', params });

//删除购物车
export const reqBagDelete = (data) => requests({
    url: '/ShoppingCartController/DeletePointProduct',
    method: 'post',
    data: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'token': window.localStorage.getItem('key')
    }
});
//查看自己订单
export const reqselfOrder = () => requests({
    url: '/OrderController/GetAllOrderInfo',
    method: 'get',
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//对自己的订单进行收货
export const reqgetItems = (params) => requests({
    url: '/OrderController/IsGetProduct',
    method: 'post',
    params,
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//查看客户订单
export const reqotherOrder = () => requests({
    url: '/OrderController/GetAllCustomerOrders',
    method: 'get',
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//对客户的订单进行发货
export const reqputItems = (params) => requests({
    url: '/OrderController/IsPutProduct',
    method: 'post',
    params,
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//查看我发布的商品
export const reqMyItems = () => requests({
    url: '/OrderController/GetAllPutInfos',
    method: 'get',
    headers: {
        'token': window.localStorage.getItem('key')
    }
});
//下架商品
export const reqDeleteMyItems = (params) => requests({
    url: '/OrderController/DeleteMyPointProduct',
    method: 'post',
    params,
    headers: {
        'token': window.localStorage.getItem('key')
    }
});



