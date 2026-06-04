const Product = require("../models/Product");

const PRODUCT_DATA = [
    // Collection 1
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
        color: "yellow",
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
        color: "blue",
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
        color: "purple",
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
        color: "brown",
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
        color: "blue",
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

    // Collection 2
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

    // Collection 3
    // Naruto Collection
    // Kurama
    {
        sku: "KUR-NAR-001",
        slug: "naruto-collection-1-kurama-keycap",
        title: "Naruto Collection 1: Kurama Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Kurama trong Naruto. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 3,
        price: 65,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773baf4e26a82825c8a7e3",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773baf4e26a82825c8a7e4",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773baf4e26a82825c8a7e5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb04e26a82825c8a7e6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb04e26a82825c8a7e7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb04e26a82825c8a7e8",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Seal Scroll
    {
        sku: "SEAL-NAR-001",
        slug: "naruto-collection-1-seal-scroll-keycap",
        title: "Naruto Collection 1: Seal Scroll Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Seal Scroll trong Naruto. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 3,
        price: 65,
        discountPercent: 0,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb04e26a82825c8a7e9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb04e26a82825c8a7eb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb14e26a82825c8a7f2",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Toad Sage
    {
        sku: "TOAD-NAR-001",
        slug: "naruto-collection-1-toad-sage-keycap",
        title: "Naruto Collection 1: Toad Sage Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Toad Sage trong Naruto. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 3,
        price: 65,
        discountPercent: 0,
        size: "6.25U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb04e26a82825c8a7ec",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb14e26a82825c8a7ed",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb14e26a82825c8a7ee",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bb14e26a82825c8a7ef",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Susanoo
    {
        sku: "SUS-NAR-001",
        slug: "naruto-collection-1-susanoo-keycap",
        title: "Naruto Collection 1: Susanoo Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Susanoo trong Naruto. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 3,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "purple",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9528b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9528c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9528d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9527f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95280",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Mark Scroll
    {
        sku: "MARK-NAR-001",
        slug: "naruto-collection-1-mark-scroll-keycap",
        title: "Naruto Collection 1: Mark Scroll Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Mark Scroll trong Naruto. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 3,
        price: 90,
        discountPercent: 0,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "purple",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9528e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9528f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9527d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95282",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95281",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95284",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Snake
    {
        sku: "SNA-NAR-001",
        slug: "naruto-collection-1-snake-keycap",
        title: "Naruto Collection 1: Snake Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Snake trong Naruto. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 3,
        price: 90,
        discountPercent: 0,
        size: "6.25U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "purple",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95291",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95290",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95286",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c95283",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63803dcf4e26a82825c9527e",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Collection 4
    // Pokemon Collection
    // Eevee
    {
        sku: "EEV-POK-001",
        slug: "pokemon-collection-1-eevee-keycap",
        title: "Pokemon Collection 1: Eevee Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Eevee trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "pink",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a97a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a97e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a97b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a97d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a97f",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Meowth
    {
        sku: "MEW-POK-001",
        slug: "pokemon-collection-1-meowth-keycap",
        title: "Pokemon Collection 1: Meowth Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Meowth trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "pink",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdc4e26a82825c8a974",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a979",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdc4e26a82825c8a978",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdc4e26a82825c8a975",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdc4e26a82825c8a977",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Weezing
    {
        sku: "WEE-POK-001",
        slug: "pokemon-collection-1-weezing-keycap",
        title: "Pokemon Collection 1: Weezing Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Weezing trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdb4e26a82825c8a96d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdb4e26a82825c8a972",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdb4e26a82825c8a971",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdb4e26a82825c8a96e",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Pikachu
    {
        sku: "PIK-POK-001",
        slug: "pokemon-collection-1-pikachu-keycap",
        title: "Pokemon Collection 1: Pikachu Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Pikachu trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bda4e26a82825c8a966",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bda4e26a82825c8a96c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bda4e26a82825c8a96b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bda4e26a82825c8a96a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bda4e26a82825c8a967",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Squirtle
    {
        sku: "SQU-POK-001",
        slug: "pokemon-collection-1-squirtle-keycap",
        title: "Pokemon Collection 1: Squirtle Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Squirtle trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdd4e26a82825c8a980",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bde4e26a82825c8a986",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3d9ae8a56480a5e02cf67",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3d9ca8a56480a5e02cf69",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bde4e26a82825c8a982",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Psyduck
    {
        sku: "PSY-POK-001",
        slug: "pokemon-collection-1-psyduck-keycap",
        title: "Pokemon Collection 1: Psyduck Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Psyduck trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bde4e26a82825c8a987",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdf4e26a82825c8a98d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3da638a56480a5e02cf77",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3da3a8a56480a5e02cf72",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773bdf4e26a82825c8a988",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Gengar
    {
        sku: "GEN-POK-001",
        slug: "pokemon-collection-1-gengar-keycap",
        title: "Pokemon Collection 1: Gengar Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Gengar trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be04e26a82825c8a98e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be04e26a82825c8a994",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3dac38a56480a5e02cf7e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3dac38a56480a5e02cf7f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3dac38a56480a5e02cf82",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Bulbasaur
    {
        sku: "BUL-POK-001",
        slug: "pokemon-collection-1-bulbasaur-keycap",
        title: "Pokemon Collection 1: Bulbasaur Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Bulbasaur trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be14e26a82825c8a995",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be14e26a82825c8a99b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3db3b8a56480a5e02cf8b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3db3b8a56480a5e02cf8c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63a3db3b8a56480a5e02cf8f",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Cubone
    {
        sku: "CUB-POK-001",
        slug: "pokemon-collection-1-cubone-keycap",
        title: "Pokemon Collection 1: Cubone Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Cubone trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be24e26a82825c8a99c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be24e26a82825c8a9a2",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be24e26a82825c8a9a1",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be24e26a82825c8a9a0",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be24e26a82825c8a99d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Charmander
    {
        sku: "CHA-POK-001",
        slug: "pokemon-collection-1-charmander-keycap",
        title: "Pokemon Collection 1: Charmander Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Charmander trong Pokemon. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 4,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be34e26a82825c8a9a3",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be34e26a82825c8a9a9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be34e26a82825c8a9a8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be34e26a82825c8a9a7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773be34e26a82825c8a9a4",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Collection 5
    // Yu-Gi-Oh! Collection
    // Blue eye dragon
    {
        sku: "BED-YGO-001",
        slug: "yugioh-collection-1-blue-eye-dragon-keycap",
        title: "Yu-Gi-Oh! Collection 1: Blue Eye Dragon Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Blue Eye Dragon trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc57",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc58",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc59",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc5a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc5b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc5c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6736fbca5d146a3762b607aa",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6736fa9341cba57c286f7a25",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6734443d5d146a3762b5dc5d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Dark magician
    {
        sku: "DM-YGO-001",
        slug: "yugioh-collection-1-dark-magician-keycap",
        title: "Yu-Gi-Oh! Collection 1: Dark Magician Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Dark Magician trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444d06df41770ae353cd2",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444f05d146a3762b5dc66",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444f05d146a3762b5dc67",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444f05d146a3762b5dc68",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444f05d146a3762b5dc6a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444f05d146a3762b5dc6b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6736fbb05d146a3762b607a7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6737535141cba57c286f7fd3",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Dark magician girl
    {
        sku: "DMG-YGO-001",
        slug: "yugioh-collection-1-dark-magician-girl-keycap",
        title: "Yu-Gi-Oh! Collection 1: Dark Magician Girl Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Dark Magician Girl trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "pink",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353ccd",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353cc7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353cc8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353cc9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353cca",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353ccb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6736fbb05d146a3762b607a6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/673444836df41770ae353ccc",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Summoned Skull
    {
        sku: "SS-YGO-001",
        slug: "yugioh-collection-1-summoned-skull-keycap",
        title: "Yu-Gi-Oh! Collection 1: Summoned Skull Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Summoned Skull trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "pink",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08e836f9ef32d9b67038",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08e836f9ef32d9b67039",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08e836f9ef32d9b6703a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08e836f9ef32d9b6703b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08e836f9ef32d9b6703c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08f536f9ef32d9b6703d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Kuriboh
    {
        sku: "KB-YGO-002",
        slug: "yugioh-collection-1-kuriboh-keycap",
        title: "Yu-Gi-Oh! Collection 1: Kuriboh Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Kuriboh trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd0844e8d1550191b71546",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd0844e8d1550191b71547",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd0844e8d1550191b71548",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd0844e8d1550191b71549",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd0844e8d1550191b7154a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd086b36f9ef32d9b67028",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Red-Eyes Black Dragon
    {
        sku: "REBD-YGO-003",
        slug: "yugioh-collection-1-red-eyes-black-dragon-keycap",
        title: "Yu-Gi-Oh! Collection 1: Red-Eyes Black Dragon Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Red-Eyes Black Dragon trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 80,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08bd36f9ef32d9b67030",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08bd36f9ef32d9b67031",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08bd36f9ef32d9b67032",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08bd36f9ef32d9b67033",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08bd36f9ef32d9b67034",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd08d809fbe23dfdc08e1a",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Exodia
    {
        sku: "EXO-YGO-001",
        slug: "yugioh-collection-1-exodia-keycap",
        title: "Yu-Gi-Oh! Collection 1: Exodia Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Exodia trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 90,
        discountPercent: 10,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd081409fbe23dfdc08e07",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd081409fbe23dfdc08e08",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd081509fbe23dfdc08e09",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd081509fbe23dfdc08e0a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd081509fbe23dfdc08e0b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/67dd082009fbe23dfdc08e0c",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Obelisk The Tormentor
    {
        sku: "OBS-YGO-001",
        slug: "yugioh-collection-2-obelisk-the-tormentor-keycap",
        title: "Yu-Gi-Oh! Collection 2: Obelisk The Tormentor Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Obelisk The Tormentor trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 60,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99818",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99819",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9981a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9981b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9981d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9981e",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Winged Dragon of Ra
    {
        sku: "WDR-YGO-001",
        slug: "yugioh-collection-2-winged-dragon-of-ra-keycap",
        title: "Yu-Gi-Oh! Collection 2: Winged Dragon of Ra Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Winged Dragon of Ra trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 60,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99826",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99827",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99828",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99829",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9982b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9982c",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Slifer the Sky Dragon
    {
        sku: "STS-YGO-001",
        slug: "yugioh-collection-2-slifer-the-sky-dragon-keycap",
        title: "Yu-Gi-Oh! Collection 2: Slifer the Sky Dragon Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện nhân vật Slifer the Sky Dragon trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 60,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b9981f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99820",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99821",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99822",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99824",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99825",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Millennium items
    {
        sku: "MIL-YGO-001",
        slug: "yugioh-collection-2-millennium-items-keycap",
        title: "Yu-Gi-Oh! Collection 2: Millennium Items Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện các vật phẩm Millennium trong Yu-Gi-Oh!. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 5,
        price: 100,
        discountPercent: 0,
        size: "6.25U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99812",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99813",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99814",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99815",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99816",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6890342c93f15d2139b99817",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Collection 6
    // G2 Collection
    // Elite
    {
        sku: "ELT-G2-001",
        slug: "g2-esports-collection-1-elite-keycap",
        title: "G2 Esports Collection 1: Elite Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện G2 Esports trong League of Legends. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 6,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "grey",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23a85d1985b324ebf3b40",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23d4d3a1e97449f957a7c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23d4d3a1e97449f957a78",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23d4d3a1e97449f957a79",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23d4d3a1e97449f957a7b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23d4d3a1e97449f957a7d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    //Shadow
    {
        sku: "SHD-G2-001",
        slug: "g2-esports-collection-1-shadow-keycap",
        title: "G2 Esports Collection 1: Shadow Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện G2 Esports trong League of Legends. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 6,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "black",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23a85d1985b324ebf3b42",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23c7bb2cf7e76f724b280",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23c7bb2cf7e76f724b27c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23c7bb2cf7e76f724b27d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23c7bb2cf7e76f724b27f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23c7bb2cf7e76f724b281",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Outburst
    {
        sku: "OUTB-G2-001",
        slug: "g2-esports-collection-1-outburst-keycap",
        title: "G2 Esports Collection 1: Outburst Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện G2 Esports trong League of Legends. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 6,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23a85d1985b324ebf3b41",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23cff3a1e97449f957a73",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23cff3a1e97449f957a6f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23cff3a1e97449f957a70",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23cff3a1e97449f957a72",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23cff3a1e97449f957a71",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/64c23cff3a1e97449f957a74",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Collection 7
    // Fnatic Collection
    // Moon
    {
        sku: "MOON-FN-001",
        slug: "fnatic-collection-1-moon-keycap",
        title: "Fnatic Collection 1: Moon Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Moon trong Fnatic. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 7,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "grey",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773b374e26a82825c8a3a2",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773b384e26a82825c8a3a5",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Mars
    {
        sku: "MARS-FN-001",
        slug: "fnatic-collection-1-mars-keycap",
        title: "Fnatic Collection 1: Mars Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Mars trong Fnatic. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 7,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773b384e26a82825c8a3a6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773b384e26a82825c8a3a9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773b384e26a82825c8a3a7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773b384e26a82825c8a3a8",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Ice
    {
        sku: "ICE-FN-001",
        slug: "fnatic-collection-1-ice-keycap",
        title: "Fnatic Collection 1: Ice Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Ice trong Fnatic. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 7,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "white",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a904e26a82825c89e3f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a904e26a82825c89e40",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Air
    {
        sku: "AIR-FN-001",
        slug: "fnatic-collection-1-air-keycap",
        title: "Fnatic Collection 1: Air Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Air trong Fnatic. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 7,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "yellow",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a904e26a82825c89e41",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a904e26a82825c89e42",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Lava
    {
        sku: "LAVA-FN-001",
        slug: "fnatic-collection-1-lava-keycap",
        title: "Fnatic Collection 1: Lava Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Lava trong Fnatic. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 7,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "black",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a904e26a82825c89e43",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a904e26a82825c89e44",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Water
    {
        sku: "WATER-FN-001",
        slug: "fnatic-collection-1-water-keycap",
        title: "Fnatic Collection 1: Water Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Water trong Fnatic. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 7,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a914e26a82825c89e45",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a914e26a82825c89e46",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Collection 8
    // The Lord of The Ring Collection
    // Durin's Axe
    {
        sku: "DA-LOTR-001",
        slug: "lotr-collection-1-durins-axe-keycap",
        title: "LOTR Collection 1: Durin's Axe Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Durin's Axe trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 90,
        discountPercent: 0,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "brown",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bc99f8734a1154e00a8f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bd95f8734a1154e00aa2",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bd95f8734a1154e00aa3",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Durin's Helm
    {
        sku: "DH-LOTR-001",
        slug: "lotr-collection-1-durins-helm-keycap",
        title: "LOTR Collection 1: Durin's Helm Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Durin's Helm trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "brown",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bc99f8734a1154e00a8e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bd68f8734a1154e00a9e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bd68f8734a1154e00a9f",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Durin's Folk
    {
        sku: "DF-LOTR-001",
        slug: "lotr-collection-1-durins-folk-keycap",
        title: "LOTR Collection 1: Durin's Folk Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Durin's Folk trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "brown",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bc99f8734a1154e00a90",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bd5293f15d2139b1480d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6809bd5293f15d2139b1480e",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Horn of Gondor
    {
        sku: "HFG-LOTR-001",
        slug: "lotr-collection-1-horn-of-gondor-keycap",
        title: "LOTR Collection 1: Horn of Gondor Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Horn of Gondor trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 90,
        discountPercent: 0,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594395e48dc793ee71c39",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594395e48dc793ee71c3a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594395e48dc793ee71c3b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594395e48dc793ee71c3c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594395e48dc793ee71c38",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // White Tree of Minas Tirith
    {
        sku: "WTM-LOTR-001",
        slug: "lotr-collection-1-white-tree-of-minas-tirith-keycap",
        title: "LOTR Collection 1: White Tree of Minas Tirith Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện White Tree of Minas Tirith trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "white",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594325e48dc793ee71c34",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594325e48dc793ee71c35",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594325e48dc793ee71c33",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594325e48dc793ee71c36",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/683594325e48dc793ee71c37",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Palantír
    {
        sku: "PAL-LOTR-001",
        slug: "lotr-collection-1-palantir-keycap",
        title: "LOTR Collection 1: Palantír Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Palantír trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 90,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "white",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6835942993f15d2139b3c3b6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6835942993f15d2139b3c3b7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6835942993f15d2139b3c3b8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6835942993f15d2139b3c3b5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6835942993f15d2139b3c3b9",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // The Red Day
    {
        sku: "TRD-LOTR-001",
        slug: "lotr-collection-1-the-red-day-keycap",
        title: "LOTR Collection 1: The Red Day Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện The Red Day trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880e87d72923f407c320a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880e87d72923f407c3209",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880e87d72923f407c320b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880e87d72923f407c320c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880e87d72923f407c320d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // The Deeping-Stream
    {
        sku: "TDS-LOTR-001",
        slug: "lotr-collection-1-the-deeping-stream-keycap",
        title: "LOTR Collection 1: The Deeping Stream Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện The Deeping-Stream trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880dde334e22f65685807",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880dde334e22f65685806",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880dde334e22f65685808",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880dde334e22f65685809",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880dde334e22f6568580a",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // The Barrowfield
    {
        sku: "TB-LOTR-001",
        slug: "lotr-collection-1-the-barrowfield-keycap",
        title: "LOTR Collection 1: The Barrowfield Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện The Barrowfield trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880d3f8a36f64a37951c5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880d3f8a36f64a37951c4",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880d3f8a36f64a37951c6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880d3f8a36f64a37951c7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/65b880d3f8a36f64a37951c8",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Barrow Sword
    {
        sku: "BS-LOTR-001",
        slug: "lotr-collection-1-barrow-sword-keycap",
        title: "LOTR Collection 1: Barrow Sword Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Barrow Sword trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "brown",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1ca",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1c9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1cd",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1d0",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Barrow Shield
    {
        sku: "BSH-LOTR-001",
        slug: "lotr-collection-1-barrow-shield-keycap",
        title: "LOTR Collection 1: Barrow Shield Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Barrow Shield trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "brown",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1c7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1c6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1cb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1ce",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Barrow Helm
    {
        sku: "BH-LOTR-001",
        slug: "lotr-collection-1-barrow-helm-keycap",
        title: "LOTR Collection 1: Barrow Helm Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Barrow Helm trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "brown",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1c8",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1c5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1cc",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/664628feef1d533f930fa1cf",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Caradhras
    {
        sku: "CARA-LOTR-001",
        slug: "lotr-collection-1-caradhras-keycap",
        title: "LOTR Collection 1: Caradhras Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Caradhras trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f20641cba57c286cc608",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f20641cba57c286cc607",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f20641cba57c286cc606",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f20641cba57c286cc609",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Eregion
    {
        sku: "ERE-LOTR-001",
        slug: "lotr-collection-1-eregion-keycap",
        title: "LOTR Collection 1: Eregion Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Eregion trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f18641cba57c286cc5fb",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f18641cba57c286cc5f9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f18641cba57c286cc5fa",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f18641cba57c286cc5fc",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Amon Sûl
    {
        sku: "AS-LOTR-001",
        slug: "lotr-collection-1-amon-sûl-keycap",
        title: "LOTR Collection 1: Amon Sûl Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Amon Sûl trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "green",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f29a5d146a3762b3554c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f29a5d146a3762b3554b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f29a5d146a3762b3554a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f29a5d146a3762b3554d",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Sirannon
    {
        sku: "SIR-LOTR-001",
        slug: "lotr-collection-1-sirannon-keycap",
        title: "LOTR Collection 1: Sirannon Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Sirannon trong The Lord of The Ring. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 8,
        price: 70,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "blue",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f25a5d146a3762b35545",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f25a5d146a3762b35543",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f25a5d146a3762b35544",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/6707f25a5d146a3762b35546",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Collection 9
    // Fast Food Collection
    // Hamburger
    {
        sku: "HAMB-FF-001",
        slug: "fast-food-collection-1-hamburger-keycap",
        title: "Fast Food Collection 1: Hamburger Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Hamburger trong Fast Food Collection. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 9,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "yellow",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a994e26a82825c89e9a",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9a4e26a82825c89e9b",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9a4e26a82825c89e9c",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9a4e26a82825c89e9d",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9e4e26a82825c89eb4",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Soda
    {
        sku: "SODA-FF-001",
        slug: "fast-food-collection-1-soda-keycap",
        title: "Fast Food Collection 1: Soda Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Soda trong Fast Food Collection. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 9,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea2",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea4",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea5",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea6",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea3",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Fries
    {
        sku: "FRIES-FF-001",
        slug: "fast-food-collection-1-fries-keycap",
        title: "Fast Food Collection 1: Fries Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Fries trong Fast Food Collection. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 9,
        price: 50,
        discountPercent: 0,
        size: "1U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "red",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9a4e26a82825c89e9e",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9a4e26a82825c89e9f",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea1",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9a4e26a82825c89ea0",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9d4e26a82825c89ead",
        ],
        status: "active",
        stock: 50,
        sold: 120,
        rating: 4.5,
        reviewCount: 32,
    },

    // Hotdog
    {
        sku: "HDOG-FF-001",
        slug: "fast-food-collection-1-hotdog-keycap",
        title: "Fast Food Collection 1: Hotdog Keycap",
        description:
            "Mô hình keycap chất lượng cao tái hiện Hotdog trong Fast Food Collection. Được đổ khuôn resin tỉ mỉ, xuyên led cực tốt.",
        categoryId: 1,
        collectionId: 9,
        price: 50,
        discountPercent: 0,
        size: "2.75U",
        height: 16.5,
        profile: "SA",
        material: "Resin",
        color: "orange",
        designer: "Dwarf Factory",
        images: [
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9b4e26a82825c89ea7",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9c4e26a82825c89ea9",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9c4e26a82825c89eaa",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9c4e26a82825c89eab",
            "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/63773a9c4e26a82825c89ea8",
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
                const cCount = await Product.count({
                    where: { categoryId: cat.id },
                });
                await cat.update({ productCount: cCount });
            }

            const collectionsList = await Collection.findAll();
            for (const col of collectionsList) {
                const cCount = await Product.count({
                    where: { collectionId: col.id },
                });
                await col.update({ productCount: cCount });
            }
            console.log(
                "Đã cập nhật productCount cho tất cả Category và Collection.",
            );
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
            const count = await Product.count({
                where: { categoryId: cat.id },
            });
            await cat.update({ productCount: count });
        }

        const collectionsList = await Collection.findAll();
        for (const col of collectionsList) {
            const count = await Product.count({
                where: { collectionId: col.id },
            });
            await col.update({ productCount: count });
        }

        console.log(
            "Đã cập nhật productCount cho tất cả Category và Collection.",
        );
    } catch (err) {
        console.error(">>> Seed error:", err.message);
    }
};

module.exports = { seedIfEmpty };
