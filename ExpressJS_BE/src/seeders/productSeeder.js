const Product = require("../models/Product");

const PRODUCT_DATA = [
    // Ace
    {
        sku: "ACE-OP-001",
        slug: "one-piece-collection-2-ace-keycap",
        title: "One Piece Collection 2: Ace Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Ace trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 50,
        discountPercent: 25,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828d",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },
    // Sabo
    {
        sku: "SABO-OP-001",
        slug: "one-piece-collection-2-sabo-keycap",
        title: "One Piece Collection 2: Sabo Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Sabo trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523913",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523914",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523915",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523916",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523917",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },
    // Luffy
    {
        sku: "LUFFY-OP-001",
        slug: "one-piece-collection-2-luffy-keycap",
        title: "One Piece Collection 2: Luffy Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Luffy trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd921aa29ec86006f2f225",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd921aa29ec86006f2f226",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd921aa29ec86006f2f227",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd921aa29ec86006f2f228",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd921aa29ec86006f2f229",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },
];

console.log(`Chuẩn bị seed ${PRODUCT_DATA.length} sản phẩm...`);

const seedIfEmpty = async () => {
    try {
        const count = await Product.count();

        if (count >= PRODUCT_DATA.length) {
            console.log(`>>> Products đã tồn tại (${count}), bỏ qua seeding.`);
            return;
        } else if (count > 0) {
            console.log(
                `>>> Products hiện có ${count}/${PRODUCT_DATA.length}, sẽ bổ sung sản phẩm thiếu.`,
            );
        }

        // Use idempotent upsert/findOrCreate per item so partial failures
        // don't leave the DB in a half-seeded state. This will insert
        // any missing products and skip existing ones.
        const Category = require("../models/Category");
        const Collection = require("../models/Collection");

        await Category.findOrCreate({
            where: { id: 1 },
            defaults: { name: "Keycap lẻ" }
        });

        await Collection.findOrCreate({
            where: { id: 2 },
            defaults: { 
                name: "One Piece", 
                image: "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828e" 
            }
        });

        let inserted = 0;
        for (const p of PRODUCT_DATA) {
            const [prod, created] = await Product.findOrCreate({
                where: { sku: p.sku },
                defaults: p,
            });
            if (created) inserted += 1;
        }
        console.log(
            `Seed hoàn tất. Thêm mới ${inserted} / ${PRODUCT_DATA.length} sản phẩm`,
        );
    } catch (err) {
        console.error(">>> Seed error:", err.message);
    }
};

module.exports = { seedIfEmpty };
