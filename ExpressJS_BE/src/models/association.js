const User = require("./User");

const Category = require("./Category");
const Collection = require("./Collection");
const Product = require("./Product");

const Wishlist = require("./Wishlist");
const CartItem = require("./CartItem");

const Review = require("./Review");

const Order = require("./Order");
const OrderItem = require("./OrderItem");

const Coupon = require("./Coupon");
const CouponUsage = require("./CouponUsage");

//
// CATEGORY - PRODUCT
//

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
});

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
});

//
// COLLECTION - PRODUCT
//

Collection.hasMany(Product, {
    foreignKey: "collectionId",
    as: "products",
});

Product.belongsTo(Collection, {
    foreignKey: "collectionId",
    as: "collection",
});

//
// USER - CART
//

User.hasMany(CartItem, {
    foreignKey: "userId",
    as: "cartItems",
});

CartItem.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

Product.hasMany(CartItem, {
    foreignKey: "productId",
    as: "cartItems",
});

CartItem.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

//
// USER - WISHLIST
//

User.hasMany(Wishlist, {
    foreignKey: "userId",
    as: "wishlist",
});

Wishlist.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

Product.hasMany(Wishlist, {
    foreignKey: "productId",
    as: "wishlists",
});

Wishlist.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

//
// USER - REVIEW
//

User.hasMany(Review, {
    foreignKey: "userId",
    as: "reviews",
});

Review.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

Product.hasMany(Review, {
    foreignKey: "productId",
    as: "reviews",
});

Review.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

//
// USER - ORDER
//

User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
});

Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

//
// ORDER - ORDER ITEM
//

Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});

//
// PRODUCT - ORDER ITEM
//

Product.hasMany(OrderItem, {
    foreignKey: "productId",
    as: "orderItems",
});

OrderItem.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

//
// COUPON - COUPON USAGE
//

Coupon.hasMany(CouponUsage, {
    foreignKey: "couponId",
    as: "usages",
});

CouponUsage.belongsTo(Coupon, {
    foreignKey: "couponId",
    as: "coupon",
});

//
// USER - COUPON USAGE
//

User.hasMany(CouponUsage, {
    foreignKey: "userId",
    as: "couponUsages",
});

CouponUsage.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

//
// ORDER - COUPON USAGE
//

Order.hasOne(CouponUsage, {
    foreignKey: "orderId",
    as: "couponUsage",
});

CouponUsage.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});

module.exports = {
    User,

    Category,
    Collection,
    Product,

    Wishlist,
    CartItem,

    Review,

    Coupon,
    CouponUsage,

    Order,
    OrderItem,
};
