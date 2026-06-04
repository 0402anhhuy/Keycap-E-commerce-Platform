const Collection = require("../models/Collection");
const Product = require("../models/Product");

const COLLECTION_DATA = [
    {
        name: "One Piece",
        logo: "https://images.seeklogo.com/logo-png/19/1/one-piece-logo-png_seeklogo-198712.png",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bdb4d5e48dc793ee861d9",
    },
    {
        name: "Attack on Titan",
        logo: "https://1000logos.net/wp-content/uploads/2025/01/Attack-on-Titan-Logo.jpg",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6865f0bcf8734a1154e5eef9",
    },
    {
        name: "Naruto",
        logo: "https://hipfonts.com/wp-content/uploads/2022/11/Naruto-Logo.jpg",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/640acc5fe75d4778c1f37c5a",
    },
    {
        name: "Pokemon",
        logo: "https://images.seeklogo.com/logo-png/28/1/pokemon-logo-png_seeklogo-284734.png",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/640ad5fc9f8354145f9f2119",
    },
    {
        name: "Yu-Gi-Oh!",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Yu-Gi-Oh%21.png",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bda095e48dc793ee861bc",
    },
    {
        name: "G2 Esports",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKugIg0EWQJTK_DmBNCnif3QypizNVBouG1Q&s",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/640ab34be75d4778c1f37b10",
    },
    {
        name: "Fnatic",
        logo: "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/641d75b7b707966653c42442",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/640acd119f8354145f9f209e",
    },
    {
        name: "Lord of The Rings",
        logo: "https://images.seeklogo.com/logo-png/43/1/lord-of-the-rings-fellowship-of-the-ring-logo-png_seeklogo-431431.png",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707fbff6df41770ae32b7ee",
    },
    {
        name: "Fast Food",
        logo: "https://images.seeklogo.com/logo-png/27/1/fastfood-logo-png_seeklogo-274838.png",
        background:
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/640aced17168d10d9ccba765",
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
            } else if (
                collection.logo !== col.logo ||
                collection.background !== col.background
            ) {
                await collection.update({
                    logo: col.logo,
                    background: col.background,
                });
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
