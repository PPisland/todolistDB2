const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

//유저 생성
router.post("/", async (req, res) => {
  try {
    const { account } = req.body;

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });
    if (existUser) {
      return res.status(400).json({ ok: false, error: "Already exist User" });
    }

    const user = await client.user.create({
      data: {
        account,
      },
    });
    res.json({ ok: true, user });
  } catch (error) {
    console.error(error);
  }
});

// 유저 조회
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await client.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(400).json({ ok: false, error: "Not exist User" });
    }

    res.json({ ok: true, user });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
