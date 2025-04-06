import express from "express"
import config  from "../config";
import OrderController from "../controller/OrderController";
const moment = require('moment');

const router = express.Router();

router.post('/create_payment_url', async function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
    var tmnCode = config.VNP_TMNCODE;
    var secretKey = config.VNP_HASHSECRET;
    var vnpUrl = config.VNP_URL;
    var returnUrl = "http://localhost:3000/payment/status";

    var date = new Date();

    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderId = moment(date).format('DDHHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === '' || locale === undefined){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    function sortObject(obj) {
        var sorted = {};
        var str = [];
        var key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    
    // const orderData = {
    //     to_name: req.body.name || "Người nhận",
    //     to_phone: req.body.phone || "0987654321",
    //     to_address: req.body.address || "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
    //     to_ward_code: "20308",
    //     to_district_id: 1444,
    //     service_type_id: 2,
    //     payment_type_id: 2,
    //     required_note: "KHONGCHOXEMHANG",
    //     weight: req.body.weight || 1000,
    //     length: 20,
    //     width: 20,
    //     height: 20,
    //     items: req.body.items || [
    //         {
    //             name: "Áo Polo",
    //             code: "Polo123",
    //             quantity: 1,
    //             price: 200000,
    //             length: 12,
    //             width: 12,
    //             height: 12,
    //             weight: 1200,
    //             category: {
    //                 level1: "Áo"
    //             }
    //         }
    //     ]
    // };

    const orderData = {
        payment_type_id: 2,
        note: "Tintest 123",
        required_note: "KHONGCHOXEMHANG",
        from_name: "TinTest124",
        from_phone: "0987654321",
        from_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
        from_ward_name: "Phường 14",
        from_district_name: "Quận 10",
        from_province_name: "HCM",
        return_phone: "0332190444",
        return_address: "39 NTT",
        return_district_id: null,
        return_ward_code: "",
        client_order_code: "",
        to_name: "TinTest124",
        to_phone: "0987654321",
        to_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
        to_ward_code: "20308",
        to_district_id: 1444,
        cod_amount: 200000,
        content: "Theo New York Times",
        weight: 200,
        length: 1,
        width: 19,
        height: 10,
        pick_station_id: 1444,
        deliver_station_id: null,
        insurance_value: 500000,
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        pick_shift: [2],
        items: [
            {
                name: "Áo Polo",
                code: "Polo123",
                quantity: 1,
                price: 200000,
                length: 12,
                width: 12,
                height: 12,
                weight: 1200,
                category: {
                    level1: "Áo"
                }
            }
        ]
    };

    try {
        const ghnResponse = await OrderController.createOrder(orderData);
        console.log("ghnResponse = ", ghnResponse);
        res.json({ paymentUrl: vnpUrl, ghnOrder: ghnResponse });
    } catch (error) {
        res.status(500).json({ paymentUrl: vnpUrl, error: "Không thể tạo đơn GHN" });
    }
});

export default router;