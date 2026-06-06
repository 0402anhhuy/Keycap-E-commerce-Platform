const { Op } = require("sequelize");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Collection = require("../models/Collection");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const ProductReview = require("../models/Review");

const slugify = (text) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/gi, "d")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
        .replace(/-+/g, "-");

const normalizeProduct = (product) => {
    if (!product) return null;
    const p = product.get ? product.get({ plain: true }) : product;
    return {
        id: p.id,
        sku: p.sku,
        slug: p.slug,
        title: p.title,
        categoryId: p.categoryId,
        collectionId: p.collectionId,
        price: Number(p.price),
        discountPercent: p.discountPercent,
        size: p.size,
        height: p.height,
        profile: p.profile,
        stem: p.stem,
        material: p.material,
        color: p.color,
        designer: p.designer,
        description: p.description,
        images: Array.isArray(p.images) ? p.images : [],
        image:
            Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
        status: p.status,
        stock: Number(p.stock),
        sold: p.sold != null ? Number(p.sold) : 0,
        rating: p.rating != null ? Number(p.rating) : null,
        reviewCount: p.reviewCount != null ? Number(p.reviewCount) : 0,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        category: p.category?.name || p.Category?.name || (typeof p.category === 'string' ? p.category : null),
        collection: p.collection?.name || p.Collection?.name || (typeof p.collection === 'string' ? p.collection : null),
    };
};

const getProducts = async ({
    ids,
    categoryId,
    collectionId,
    search,
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    limit = 20,
    allStatus,
}) => {
    const where = {};
    if (allStatus !== "true") {
        where.status = "active";
    }
    if (ids) {
        const parsedIds = ids
            .split(",")
            .map((v) => parseInt(v.trim(), 10))
            .filter((n) => !isNaN(n));
        if (parsedIds.length === 0)
            return {
                total: 0,
                page: Number(page),
                limit: Number(limit),
                products: [],
            };
        where.id = { [Op.in]: parsedIds };
    }
    if (categoryId && categoryId !== "all") where.categoryId = categoryId;
    if (collectionId) where.collectionId = collectionId;
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = Number(minPrice);
        if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    const orderMap = {
        newest: [["createdAt", "DESC"]],
        oldest: [["createdAt", "ASC"]],
        price_asc: [["price", "ASC"]],
        price_desc: [["price", "DESC"]],
        popular: [["sold", "DESC"]],
        rating: [["rating", "DESC"]],
    };
    const order = orderMap[sort] || orderMap.newest;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        where,
        order,
        include: [
            { model: Category, as: "category" },
            { model: Collection, as: "collection" },
        ],
        limit: Number(limit),
        offset,
    });
    return {
        total: count,
        page: Number(page),
        limit: Number(limit),
        products: rows.map(normalizeProduct),
    };
};

const getProductById = async (id) => {
    const product = await Product.findOne({
        where: { id, status: "active" },
        include: [
            {
                model: Category,
                as: "category",
            },
            {
                model: Collection,
                as: "collection",
            },
        ],
    });
    if (!product)
        throw Object.assign(new Error("Sản phẩm không tồn tại."), {
            status: 404,
        });

    const buyersCount = await Order.count({
        include: [
            {
                model: OrderItem,
                as: "items",
                where: { productId: id },
            },
        ],
        where: {
            status: { [Op.ne]: "cancelled" },
        },
    });

    const commentersCount = await ProductReview.count({
        where: { productId: id },
    });

    const normalized = normalizeProduct(product);
    normalized.buyersCount = buyersCount;
    normalized.commentersCount = commentersCount;
    return normalized;
};

const getProductBySlug = async (slug) => {
    const product = await Product.findOne({
        where: { slug, status: "active" },
        include: [
            {
                model: Category,
                as: "category",
            },
            {
                model: Collection,
                as: "collection",
            },
        ],
    });
    if (!product)
        throw Object.assign(new Error("Sản phẩm không tồn tại."), {
            status: 404,
        });

    const buyersCount = await Order.count({
        include: [
            {
                model: OrderItem,
                as: "items",
                where: { productId: product.id },
            },
        ],
        where: {
            status: { [Op.ne]: "cancelled" },
        },
    });

    const commentersCount = await ProductReview.count({
        where: { productId: product.id },
    });

    const normalized = normalizeProduct(product);
    normalized.buyersCount = buyersCount;
    normalized.commentersCount = commentersCount;
    return normalized;
};

const createProduct = async (data) => {
    let {
        sku,
        title,
        categoryId,
        collectionId,
        price,
        discountPercent,
        size,
        height,
        profile,
        stem,
        material,
        color,
        designer,
        description,
        images,
        stock,
    } = data;
    const slug = `${slugify(title)}-${Date.now()}`;
    if (!sku) {
        sku = `SKU-${Date.now()}`;
    }
    const product = await Product.create({
        sku,
        title,
        slug,
        categoryId,
        collectionId: collectionId || null,
        price,
        discountPercent: discountPercent || 0,
        size,
        height,
        profile,
        stem,
        material,
        color,
        designer,
        description,
        images: images || [],
        stock: stock || 0,
        status: "active",
    });
    return normalizeProduct(product);
};

const updateProduct = async (productId, data) => {
    const product = await Product.findByPk(productId);
    if (!product)
        throw Object.assign(new Error("Sản phẩm không tồn tại."), {
            status: 404,
        });
    if (data.title && data.title !== product.title) {
        data.slug = `${slugify(data.title)}-${Date.now()}`;
    }
    await product.update(data);
    return normalizeProduct(product);
};

const deleteProduct = async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product)
        throw Object.assign(new Error("Sản phẩm không tồn tại."), {
            status: 404,
        });
    await product.update({ status: "deleted" });
};

const setProductStatus = async (productId, status) => {
    const product = await Product.findByPk(productId);
    if (!product)
        throw Object.assign(new Error("Sản phẩm không tồn tại."), {
            status: 404,
        });
    await product.update({ status });
    return normalizeProduct(product);
};

const getSimilarProducts = async (identifier) => {
    const isNumeric = !isNaN(identifier) && !isNaN(parseFloat(identifier));
    const whereClause = isNumeric ? { id: identifier } : { slug: identifier };
    
    const product = await Product.findOne({ where: whereClause });
    if (!product) return [];

    const clauses = [];
    if (product.collectionId) {
        clauses.push({ collectionId: product.collectionId });
    }
    if (product.color) {
        clauses.push({ color: product.color });
    }
    
    // Fallback to category if no collection or color
    if (clauses.length === 0 && product.categoryId) {
        clauses.push({ categoryId: product.categoryId });
    }

    const similar = await Product.findAll({
        where: {
            id: { [Op.ne]: product.id },
            status: "active",
            ...(clauses.length > 0 ? { [Op.or]: clauses } : {}),
        },
        limit: 12,
        order: [["sold", "DESC"]],
    });

    return similar.map(normalizeProduct);
};

const getManagerProducts = async ({ status, page = 1, limit = 20 }) => {
    const where = {};
    if (status) where.status = status;
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({
        where,
        include: [
            { model: Category, as: "category", attributes: ["id", "name"] },
        ],
        order: [["createdAt", "DESC"]],
        limit: Number(limit),
        offset,
    });
    return {
        total: count,
        page: Number(page),
        limit: Number(limit),
        products: rows.map(normalizeProduct),
    };
};

module.exports = {
    normalizeProduct,
    getProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    setProductStatus,
    getSimilarProducts,
    getManagerProducts,
};
