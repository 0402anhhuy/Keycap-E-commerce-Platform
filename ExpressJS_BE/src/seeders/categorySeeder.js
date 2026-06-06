const Category = require("../models/Category");
const { slugify } = require("./collectionSeeder");

const CATEGORY_DATA = [
    { name: "Artisan Keycap" },
    { name: "Deskmat" }
];

const seedCategoriesIfEmpty = async () => {
    try {
        console.log(`Chuẩn bị seed ${CATEGORY_DATA.length} categories...`);
        let inserted = 0;

        for (const cat of CATEGORY_DATA) {
            cat.slug = slugify(cat.name);
            const [category, created] = await Category.findOrCreate({
                where: { name: cat.name },
                defaults: cat,
            });

            if (created) {
                inserted += 1;
            } else if (category.slug !== cat.slug) {
                await category.update({ slug: cat.slug });
            }
        }

        console.log(
            `Seed Category hoàn tất. Thêm mới ${inserted} / ${CATEGORY_DATA.length} category.`,
        );
    } catch (err) {
        console.error("Seed error (Category):", err.message, err.errors || err);
    }
};

module.exports = { seedCategoriesIfEmpty, CATEGORY_DATA };
