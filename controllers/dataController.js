const Data = require('../models/data.model');
const { encrypt, decrypt, hashFunc } = require('../utils/function');

exports.getOwnData = async (req, res) => {
    const { username } = req.body;
    try {
        const data = await Data.findOne({ username });
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ error: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getPublicData = async (req, res) => {
    const { username } = req.body;
    try {
        const data = await Data.findOne({ username, confidential: false });
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ error: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.saveData = async (req, res) => {
    const { username, data } = req.body;
    try {
        const encryptedValue = encrypt(JSON.stringify(data));
        const hashedValue = hashFunc(JSON.stringify(data));

        const existingData = await Data.findOne({ username });
        if (existingData) {
            existingData.data = { encryptedValue, hashedValue };
            await existingData.save();
        } else {
            const newData = new Data({ username, data: { encryptedValue, hashedValue } });
            await newData.save();
        }
        res.json({ message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.decryptData = (req, res) => {
    const { encryptedData } = req.body;
    try {
        const decryptedData = JSON.parse(decrypt(encryptedData));
        res.json({ decryptedData });
    } catch (error) {
        res.status(400).json({ error: "Decryption failed" });
    }
};
