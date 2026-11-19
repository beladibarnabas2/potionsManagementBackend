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

router.get("/:id", async (req, res) => {
    try {
        const [entry] = await db
        .select()
        .from(potions)
        .where(eq(potions.id, +req.params.id));

       if(!entry) return res.status(404).json({
            success: false,
            message: "Potion not found"
        })

        return res.status(200).json({
            success: true,
            potion: entry
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, effect, isDangerous } = req.body;
        if (!name) return res.status(404).json({
            success: false,
            message: "The name field required"
        });
         if (!effect) return res.status(404).json({
            success: false,
            message: "The effect field required"
        }) ;      
        if (isDangerous === undefined) return res.status(404).json({
            success: false,
            message: "The isDangerous field required"
        });

        await db.insert(potions).values({
            name: name,
            effect: effect,
            isDangerous: isDangerous
        });

        return res.status(201).json({
            success: true,
            message: "Potion created successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const [existing] = await db
        .select()
        .from(potions)
        .where(eq(potions.id, +req.params.id));

        if (!existing) return res.status(404).json({
            success: false,
            message: "Potion not found"
        })

        await db.delete(potions).where(eq(potions.id, +req.params.id));

        return res.status(200).json({
            success: true,
            message: "Potion deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const [existing] = await db
        .select()
        .from(potions)
        .where(eq(potions.id, +req.params.id));

       if(!existing) return res.status(404).json({
            success: false,
            message: "Potion not found"
        });

        const { name, effect, isDangerous } = req.body;

        await db
        .update(potions)
        .set({
            name: name,
            effect: effect,
            isDangerous: isDangerous
        })
        .where(eq(potions.id, +req.params.id));        

        return res.status(201).json({
            success: true,
            message: "Potion updated successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


module.exports = router;