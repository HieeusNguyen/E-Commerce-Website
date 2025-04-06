const axios = require('axios');
const { default: config } = require('../config');

class OrderController{
    // POST
    async createOrder(orderData){
        try{
            const response = axios.post(config.CREATE_ORDER_GHN, orderData,{
                headers:{
                    "Content-Type": "application/json",
                    "ShopId": config.SHOP_ID_GHN,
                    "Token": config.TOKEN_GHN,
                }
            });
            return (await response).data;
        }catch(error){
            console.log("GHN Error: ", error.response ? error.response.data : error.message);
            throw error;       
        }
    }
}

module.exports = new OrderController();