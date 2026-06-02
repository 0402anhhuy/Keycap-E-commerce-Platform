const { Collection } = require("../models/association");

const getCollections = async (req, res) => {
    try {
        const collections = await Collection.findAll({
            order: [["name", "ASC"]],
        });
        res.json(collections);
    } catch (error) {
        console.error(">>> getCollections error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getCollections,
};
