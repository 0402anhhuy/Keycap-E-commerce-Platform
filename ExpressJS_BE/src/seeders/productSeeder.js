const Product = require("../models/Product");

const PRODUCT_DATA = [
    // One Piece Collection
    // Luffy
    {
        sku: "LUFFY-OP-001",
        slug: "one-piece-collection-1-luffy-keycap",
        title: "One Piece Collection 1: Luffy Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Luffy trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
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

    // Zoro
    {
        sku: "ZORO-OP-001",
        slug: "one-piece-collection-1-zoro-keycap",
        title: "One Piece Collection 1: Zoro Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Zoro trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd925b936f465e5aa881c5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd925b936f465e5aa881c6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd925b936f465e5aa881c7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd925b936f465e5aa881c8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd925b936f465e5aa881c9",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Nami
    {
        sku: "NAMI-OP-001",
        slug: "one-piece-collection-1-nami-keycap",
        title: "One Piece Collection 1: Nami Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Nami trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd923e18e43b3d2dd6637b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd923e18e43b3d2dd6637c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd923e18e43b3d2dd6637d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd923e18e43b3d2dd6637e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd923e18e43b3d2dd6637f",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Usopp
    {
        sku: "USOPP-OP-001",
        slug: "one-piece-collection-1-ussop-keycap",
        title: "One Piece Collection 1: Usopp Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Usopp trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd92b618e43b3d2dd6638a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd92b618e43b3d2dd6638b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd92b618e43b3d2dd6638c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd92b618e43b3d2dd6638d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd92b618e43b3d2dd6638e",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Sanji
    {
        sku: "SANJI-OP-001",
        slug: "one-piece-collection-1-sanji-keycap",
        title: "One Piece Collection 1: Sanji Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Sanji trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd927a936f465e5aa881cb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd927a936f465e5aa881cc",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd927b936f465e5aa881cd",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd927b936f465e5aa881ce",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd927b936f465e5aa881cf",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Chopper
    {
        sku: "CHOPPER-OP-001",
        slug: "one-piece-collection-1-chopper-keycap",
        title: "One Piece Collection 1: Chopper Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Chopper trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "pink",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd929518e43b3d2dd66383",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd929518e43b3d2dd66384",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd929518e43b3d2dd66385",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd929518e43b3d2dd66386",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/66cd929518e43b3d2dd66387",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Robin
    {
        sku: "ROBIN-OP-001",
        slug: "one-piece-collection-1-robin-keycap",
        title: "One Piece Collection 1: Robin Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Robin trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 55,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "pink",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00cb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00ca",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00cc",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00cd",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00ce",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00cf",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Franky
    {
        sku: "FRANKY-OP-001",
        slug: "one-piece-collection-1-franky-keycap",
        title: "One Piece Collection 1: Franky Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Franky trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 55,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "gray",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00bf",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00be",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c0",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c1",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c2",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c3",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Brook
    {
        sku: "BROOK-OP-001",
        slug: "one-piece-collection-1-brook-keycap",
        title: "One Piece Collection 1: Brook Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Brook trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386312f5e05d004f00b9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386312f5e05d004f00b8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00ba",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00bb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00bc",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00bd",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Jinbe
    {
        sku: "JINBE-OP-001",
        slug: "one-piece-collection-1-jinbe-keycap",
        title: "One Piece Collection 1: Jinbe Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Jinbe trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c4",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68a4386412f5e05d004f00c9",
        ],
        status: "active",
        stock: 25,
        sold: 120,
        rating: 4.8,
        reviewCount: 32,
    },

    // Ace
    {
        sku: "ACE-OP-001",
        slug: "one-piece-collection-2-ace-keycap",
        title: "One Piece Collection 2: Ace Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Ace trong One Piece. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 1,
        price: 65,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SAR1",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828e",
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
        collectionId: 1,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523914",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da111c12f5e05d00523913",
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

    // Attack on Titan Collection
    // Scout Regiment
    {
        sku: "SR-AOT-001",
        slug: "attack-on-titan-collection-1-scout-regiment-keycap",
        title: "Attack on Titan Collection 1: Scout Regiment Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Scout Regiment trong Attack on Titan. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
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
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb4fe5e48dc793ee85f6c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5895e48dc793ee85f7c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb58a5e48dc793ee85f7d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb58a5e48dc793ee85f7e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb58a5e48dc793ee85f7f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb7015e48dc793ee85f9e",
        ],
        status: "active",
        stock: 4,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Armored Titan
    {
        sku: "AT-AOT-001",
        slug: "attack-on-titan-collection-1-armored-titan-keycap",
        title: "Attack on Titan Collection 1: Armored Titan Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Armored Titan trong Attack on Titan. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 65,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5645e48dc793ee85f75",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5645e48dc793ee85f76",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5645e48dc793ee85f77",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5645e48dc793ee85f78",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb7015e48dc793ee85f98",
        ],
        status: "active",
        stock: 4,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Colossal Titan
    {
        sku: "CT-AOT-001",
        slug: "attack-on-titan-collection-1-colossal-titan-keycap",
        title: "Attack on Titan Collection 1: Colossal Titan Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Colossal Titan trong Attack on Titan. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 65,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb579f8734a1154e3c766",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb579f8734a1154e3c767",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb579f8734a1154e3c768",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb579f8734a1154e3c769",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb7015e48dc793ee85f9a",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Attack Titan
    {
        sku: "ATK-AOT-001",
        slug: "attack-on-titan-collection-1-attack-titan-keycap",
        title: "Attack on Titan Collection 1: Attack Titan Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Attack Titan trong Attack on Titan. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 65,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "grey",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb54b5e48dc793ee85f70",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb54b5e48dc793ee85f71",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb54b5e48dc793ee85f72",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb54b5e48dc793ee85f73",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb7015e48dc793ee85f99",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // ODM Gear Swords
    {
        sku: "ODM-AOT-001",
        slug: "attack-on-titan-collection-1-odm-gear-swords-keycap",
        title: "Attack on Titan Collection 1: ODM Gear Swords Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật ODM Gear Swords trong Attack on Titan. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 2,
        price: 90,
        discountPercent: 0,
        size: "6.25U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5e95e48dc793ee85f85",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5e95e48dc793ee85f86",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5e95e48dc793ee85f87",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb5e95e48dc793ee85f88",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/684bb7015e48dc793ee85f9d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },
];

console.log(`Chuẩn bị seed ${PRODUCT_DATA.length} sản phẩm...`);

const seedIfEmpty = async () => {
    try {
        const count = await Product.count();

        if (count >= PRODUCT_DATA.length) {
            console.log(`>>> Products đã tồn tại (${count}), bỏ qua seeding.`);
            
            // Recalculate productCounts to sync any existing records
            const Category = require("../models/Category");
            const Collection = require("../models/Collection");
            const categoriesList = await Category.findAll();
            for (const cat of categoriesList) {
                const cCount = await Product.count({ where: { categoryId: cat.id } });
                await cat.update({ productCount: cCount });
            }

            const collectionsList = await Collection.findAll();
            for (const col of collectionsList) {
                const cCount = await Product.count({ where: { collectionId: col.id } });
                await col.update({ productCount: cCount });
            }
            console.log("Đã cập nhật productCount cho tất cả Category và Collection.");
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

        const categories = [{ name: "Artisan Keycap" }, { name: "Deskmat" }];

        for (const category of categories) {
            await Category.findOrCreate({
                where: { name: category.name },
                defaults: category,
            });
        }

        const [catArtisan] = await Category.findOrCreate({
            where: { name: "Artisan Keycap" },
        });

        const [colOnePiece] = await Collection.findOrCreate({
            where: { name: "One Piece" },
            defaults: {
                image: "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828e",
            },
        });

        const [colAOT] = await Collection.findOrCreate({
            where: { name: "Attack on Titan" },
            defaults: {
                image: "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828e",
            },
        });

        let inserted = 0;
        for (const p of PRODUCT_DATA) {
            // Map hardcoded IDs to actual DB IDs
            p.categoryId = catArtisan.id;

            if (p.collectionId === 1) {
                p.collectionId = colOnePiece.id;
            } else if (p.collectionId === 2) {
                p.collectionId = colAOT.id;
            }

            const [prod, created] = await Product.findOrCreate({
                where: { sku: p.sku },
                defaults: p,
            });
            if (created) inserted += 1;
        }

        console.log(
            `Seed hoàn tất. Thêm mới ${inserted} / ${PRODUCT_DATA.length} sản phẩm`,
        );

        // Recalculate productCounts to sync any existing records
        const categoriesList = await Category.findAll();
        for (const cat of categoriesList) {
            const count = await Product.count({ where: { categoryId: cat.id } });
            await cat.update({ productCount: count });
        }

        const collectionsList = await Collection.findAll();
        for (const col of collectionsList) {
            const count = await Product.count({ where: { collectionId: col.id } });
            await col.update({ productCount: count });
        }
        
        console.log("Đã cập nhật productCount cho tất cả Category và Collection.");
    } catch (err) {
        console.error(">>> Seed error:", err.message);
    }
};

module.exports = { seedIfEmpty };
