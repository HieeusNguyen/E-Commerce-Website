import dotenv from "dotenv";

dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://hieudeptrai4603:uhTa0503TH@ac-ypxydby-shard-00-00.fcknjbe.mongodb.net:27017,ac-ypxydby-shard-00-01.fcknjbe.mongodb.net:27017,ac-ypxydby-shard-00-02.fcknjbe.mongodb.net:27017/?replicaSet=atlas-xta2ys-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    VNP_TMNCODE: "UV0NXBSY",
    VNP_HASHSECRET: "JAJL4BSJ2IHJN2C95N8QQ7SR8DGQOGWL",
    VNP_URL: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    CREATE_ORDER_GHN: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
    SHOP_ID_GHN: "196335",
    TOKEN_GHN: "578fae62-122c-11f0-95d0-0a92b8726859",
};
