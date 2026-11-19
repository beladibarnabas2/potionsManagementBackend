const express = require("express");
const { eq } = require("drizzle-orm");
const db = require("../db/db");
const { potions } = require("../db/schema");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const entries = await db.select().from(potions);
        return res.status(200).json({
            success: true,
            potions: entries
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;