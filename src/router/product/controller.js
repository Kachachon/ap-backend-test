const express = require("express");
const router = express.Router();
const { create_, read_, update_, delete_ } = require("../../database/db");

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const created_product = await create_(data, "product");
    return res.status(200).json({
      status: 200,
      message: "success",
      data: created_product,
    });
  } catch (error) {
    console.log("error =>", error);
    return error;
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    let data = [];
    if (id) {
      data = await read_(id);
    } else {
      data = await read_();
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log("error =>", error);
    throw error;
  }
});

router.put("/", async (req, res, next) => {
  try {
    const body = req.body;
    const data = await update_(body.id, body);
    if (data === false) {
      return res.status(400).json({
        message: "invalid parameter",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log("error =>", error);
    return error;
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        message: "invalid product id",
      });
    }
    const data = await delete_(id, "product");
    if (data === false) {
      return res.status(400).json({
        message: "invalid parameter",
      });
    }
    return res.status(200).json({
      message: `Delete product ID ${id} - Successfully`,
    });
  } catch (error) {
    console.log("error =>", error);
    return error;
  }
});

module.exports = router;
