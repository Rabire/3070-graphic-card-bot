const fetch = require("node-fetch");
const data = require("./data.json");

const articles = data.articles;

let round = 0;

(async () => {
  console.log(`running...`);

  while (true) {
    const articleUrl = articles[round % articles.length];

    await fetch(articleUrl)
      .then(async (res) => {
        const reponse = await res.text();

        // console.log(`${articleUrl.substring(94)} DONE !`);

        if (!reponse.includes("Rupture de stock")) {
          console.log(`CG EN STOCK: ${articleUrl}`);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => round++);
  }
})();
