const fetch = require("node-fetch");
const data = require("./data.json");
const moment = require("moment");

const articles = data.articles;

let round = 0;

const alert = (url) => {
  console.log(`${moment().format("LTS")}: CG EN STOCK: ${url}`);
};

(async () => {
  console.log(`running...`);

  while (true) {
    const articleUrl = articles[round % articles.length];

    // console.log(`TESTING ${articleUrl.substring(94)} !`);

    await fetch(articleUrl)
      .then(async (res) => {
        // console.log(`GOT ${articleUrl} !`);
        const reponse = await res.text();

        if (articleUrl.includes("ldlc")) {
          const stockDiv = reponse.substring(
            reponse.lastIndexOf("<aside>") + 1,
            reponse.lastIndexOf("</aside>")
          );

          if (!stockDiv.includes("Rupture")) {
            alert(articleUrl);
          }

          // alert(articleUrl);
        } else if (articleUrl.includes("topachat")) {
          if (!reponse.includes("Rupture de stock")) {
            alert(articleUrl);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => round++);
  }
})();
