const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const client = new PrismaClient();

//투두 생성
router.post("/", async (req, res) => {
  try {
    const { todo, userId } = req.body;

    if (!todo || !userId) {
      return res
        .status(400)
        .json({ ok: false, error: "todo 또는 userId가 없습니다" });
    }

    const user = await client.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "Not exist User" });
    }

    const newTodo = await client.todo.create({
      data: {
        todo,
        isDone: false,
        userId: user.id,
      },
    });

    res.json({ ok: true, newTodo });
  } catch (error) {
    console.error(error);
  }
});

// 특정 투두 조회
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await client.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "Not exist User" });
    }

    const todos = await client.todo.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    res.json({ ok: true, todos });
  } catch (error) {
    console.error(error);
  }
});

// router.get("/", (req, res) => {
//   try {
//     res.send("임시");
//   } catch (error) {
//     console.error(error);
//   }
// });

//투두 완료
router.put("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existTodo = await client.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existTodo) {
      return res
        .status(400)
        .json({ ok: false, error: "Todo가 존재하지 않습니다" });
    }
    console.log(existTodo.userId);
    console.log(userId);
    if (existTodo.userId !== parseInt(userId)) {
      return res.status(400).json({ ok: false, error: "U R not todo owner" });
    }

    //  id를 통해서 투두의 상태 값을 확인
    const updated = await client.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDone: !existTodo.isDone,
      },
    });
    res.json({ ok: true, todo: updated });
  } catch (error) {
    console.error(error);
  }
});

//투두삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existTodo = await client.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!existTodo) {
      return res.status(400).json({ ok: false, error: "Not exist Todo" });
    }

    if (existTodo.userId !== parseInt(userId)) {
      return res.status(400).json({ ok: false, error: "U R not todo owner" });
    }

    const deleteTodo = await client.todo.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ ok: true, todo: deleteTodo });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
