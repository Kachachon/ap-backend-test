const JSONdb = require("simple-json-db");
const db = new JSONdb("src/database/db.json");
const dayjs = require("dayjs");

const create_ = async (data) => {
  const existingDataArr = await db.get("product");
  console.log(existingDataArr);
  let insertData = {};
  if (existingDataArr) {
    insertData = {
      id: existingDataArr.length + 1,
      product_group: data.product_group,
      product_name: data.product_name,
      price: data.price,
      currency: data.currency,
      available: data.available,
      status: "active",
      created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      updated_at: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    };
    existingDataArr.push(insertData);
    db.set("product", existingDataArr);
  } else {
    insertData = {
      id: 1,
      product_group: data.product_group,
      product_name: data.product_name,
      price: data.price,
      currency: data.currency,
      available: data.available,
      status: "active",
      created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      updated_at: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    };
    const existingDataArr = [];
    existingDataArr.push(insertData);
    db.set("product", existingDataArr);
  }
  return insertData;
};

const read_ = async (id) => {
  const productArr = await db.get("product");
  let product = {};
  if (id) {
    for (let i = 0; i <= productArr.length - 1; i++) {
      if (productArr[i].id === +id) {
        product = productArr[i];
      }
    }
    return product;
  } else {
    return db.get("product");
  }
};

const update_ = async (id, data) => {
  let update = false;
  const productArr = await db.get("product");

  if (productArr) {
    for (let i = 0; i <= productArr.length - 1; i++) {
      if (productArr[i].id === +id) {
        productArr[i] = data;
        db.set("product", productArr);
        update = true;
      }
    }
    if (update === true) {
      return data;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const delete_ = async (id) => {
  let productArr = await db.get("product");

  let delProduct = productArr.filter((product) => product.id !== +id);

  if (productArr.length === delProduct.length) {
    return false;
  }

  db.set("product", delProduct);

  return;
};

module.exports = {
  create_,
  read_,
  update_,
  delete_,
};
