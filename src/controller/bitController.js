const axios = require('axios');
const blockchainModel = require('../model/blockchainModel');

const getData = async (req, res) => {
    try {
        const options = {
            headers: { Authorization: 'Bearer XXXXXXXXXX' },
            method: 'get',
            url: `http://api.coincap.io/v2/assets?key=${req.headers.Authorization}`
        }
        const result = await axios(options);
        let sorted = result.data.data;
        sorted = sorted.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr);

        let arr = [];
        await blockchainModel.deleteMany({});
        for (let a = 0; a < sorted.length; a++) {
            let x = sorted[a].name;
            let y = sorted[a].symbol;
            var foundData = await blockchainModel.findOne({ name: x, symbol: y });
            if (!foundData) {
                let obj = {};
                obj.symbol = sorted[a].symbol;
                obj.name = sorted[a].name;
                obj.marketCapUsd = sorted[a].marketCapUsd;
                obj.priceUsd = sorted[a].priceUsd;
                arr.push(obj);
            }
        }
        await blockchainModel.insertMany(arr);
        return res.status(200).send({ status: true, data: sorted });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = { getData };

