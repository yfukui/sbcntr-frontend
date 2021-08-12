import db from "./index";

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await addItems();
  for (let i = 0; i < 2; i++) {
    await db.notification.create({
      data: {
        title: `通知${i + 1}`,
        description: "コンテナアプリケーションの作成の時間です。",
        category: "information",
        updatedAt: undefined,
      },
    });
  }
};

const addItems = async () => {
  // TODO: お花系に全部そろえる
  await db.item.create({
    data: {
      name: "Flower",
      title: "Flower",
      favorite: true,
      img: "/flower-park.jpeg",
    },
  });
  await db.item.create({
    data: {
      name: "Apple",
      title: "My apple",
      favorite: false,
      img: "/apple.jpeg",
    },
  });
  await db.item.create({
    data: {
      name: "Goods",
      title: "My goods",
      favorite: false,
      img: "/goods.jpeg",
    },
  });
  await db.item.create({
    data: {
      name: "Dice",
      title: "Cool dices",
      favorite: true,
      img: "/dice.jpeg",
    },
  });
  await db.item.create({
    data: {
      name: "Darts",
      title: "Antique darts board",
      favorite: false,
      img: "/darts.jpeg",
    },
  });
};

export default seed;
