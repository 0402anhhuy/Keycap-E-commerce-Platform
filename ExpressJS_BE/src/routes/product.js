const express = require("express");

const router = express.Router();
const {
    authMiddleware,
    requireRole,
} = require("../middleware/auth");

const {
    getProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    setProductStatus,
    getSimilarProducts,
    getManagerProducts,
} = require("../controllers/productController");

router.get(
    "/manager/queue",
    authMiddleware,
    requireRole("manager", "admin"),
    getManagerProducts,
);

router.get("/", getProducts);
router.get("/:identifier/similar", getSimilarProducts);
router.get("/:slug", getProductBySlug)
router.get("/:id", getProductById);

router.post("/", authMiddleware, requireRole("admin"), createProduct);

router.put("/:id", authMiddleware, requireRole("admin"), updateProduct);

router.delete("/:id", authMiddleware, requireRole("admin"), deleteProduct);

router.patch("/:id/status", authMiddleware, requireRole("admin"), setProductStatus);
router.patch(
    "/:id/moderation",
    authMiddleware,
    requireRole("manager", "admin"),
    setProductStatus,
);

module.exports = router;
