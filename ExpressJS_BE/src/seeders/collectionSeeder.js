const Collection = require("../models/Collection");
const Product = require("../models/Product");

const COLLECTION_DATA = [
    {
        name: "One Piece",
        image: "https://images.seeklogo.com/logo-png/19/1/one-piece-logo-png_seeklogo-198712.png",
    },
    {
        name: "Attack on Titan",
        image: "https://1000logos.net/wp-content/uploads/2025/01/Attack-on-Titan-Logo.jpg",
    },
    {
        name: "Naruto",
        image: "https://hipfonts.com/wp-content/uploads/2022/11/Naruto-Logo.jpg",
    },
    {
        name: "Pokemon",
        image: "https://images.seeklogo.com/logo-png/28/1/pokemon-logo-png_seeklogo-284734.png",
    },
    {
        name: "Yu-Gi-Oh!",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Yu-Gi-Oh%21.png",
    },
    {
        name: "G2 Esports",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKugIg0EWQJTK_DmBNCnif3QypizNVBouG1Q&s",
    },
    {
        name: "The Lord of the Rings",
        image: "https://images.seeklogo.com/logo-png/43/1/lord-of-the-rings-fellowship-of-the-ring-logo-png_seeklogo-431431.png",
    },
    {
        name: "Fast Food",
        image: "https://images.seeklogo.com/logo-png/27/1/fastfood-logo-png_seeklogo-274838.png",
    },
    {
        name: "Fnatic",
        image: "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/641d75b7b707966653c42442",
    },
];

const seedCollectionsIfEmpty = async () => {
    try {
        console.log(`Chuẩn bị seed ${COLLECTION_DATA.length} collections...`);
        let inserted = 0;

        for (const col of COLLECTION_DATA) {
            const [collection, created] = await Collection.findOrCreate({
                where: { name: col.name },
                defaults: col,
            });

            if (created) {
                inserted += 1;
            } else if (collection.image !== col.image) {
                await collection.update({ image: col.image });
            }
        }

        const allCollections = await Collection.findAll();
        for (const col of allCollections) {
            const count = await Product.count({
                where: { collectionId: col.id },
            });
            await col.update({ productCount: count });
        }

        console.log(
            `Seed Collection hoàn tất. Thêm mới ${inserted} / ${COLLECTION_DATA.length} collection.`,
        );
    } catch (err) {
        console.error(
            "Seed error (Collection):",
            err.message,
            err.errors || err,
        );
    }
};

module.exports = { seedCollectionsIfEmpty, COLLECTION_DATA };
