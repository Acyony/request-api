/*
-=^.^-=----------
First get the article name from the
* If the article isn't null, use title
* Otherwise, if the story_title isn't null, use story_title
* If both are null, ignore the article
-=^.^-=-----------
* Sort the titles decreasing by comment count, then increasing alphabetically by article name if there is a tie in comments count.
*Return a list of top limit articles names.
-=^.^-=-----------
*/

document.querySelector("#button-query").addEventListener("click", topArticles);
let articles = document.querySelector("#articles");

//-=^.^-=---------- Fetch per number of comments -----=^.^-=-----
async function topArticles(limit) {
    let page = 1
    //-=^.^-=----------Fetching all articles -----=^.^-=-----
    let articles = [];

    while (page <= 5) {
        let response = await fetch(`https://jsonmock.hackerrank.com/api/articles?page=${page}`);
        let json = await response.json();
        articles = articles.concat(json.data)
        page++

    }

    /*-=^.^-=---------- When article has no title, apply the story title.
    Article is ignored when both article title and story title are not available
     -----=^.^-=-----*/

    let fixedArticles = [];
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        if (article.title) {
            fixedArticles.push({
                title: article.title,
                num_comments: article.num_comments ?
                    article.num_comments : 0
            });
        } else if (article.story_title) {
            fixedArticles.push({
                title: article.story_title,
                num_comments: article.num_comments ?
                    article.num_comments : 0
            })
        }

    }

    /*-=^.^-=---------- Using sort to order the articles by title  -----=^.^-=-----*/
    fixedArticles.sort((a, b) => {
        if (a.title === b.title) {
            return 0;
        } else if (a.title > b.title) {
            return 1;
        } else {
            return -1;
        }
    })

    /*-=^.^-=---------- Using sort to order the articles by number of comments -----=^.^-=-----*/
    fixedArticles.sort((a, b) => {
        if (a.num_comments === b.num_comments) {
            return 0;
        } else if (a.num_comments > b.num_comments) {
            return 1
        } else {
            return -1;
        }
    })

    /*return fixedArticles.map((a) => a.title).slice(0, limit); */// array only with titles

    return fixedArticles.slice(0, limit);


}

/*
limit = how many articles per page
*/


async function main() {
    const result = await topArticles(10)
    result.forEach((article) => {
        console.log(article)
        articles.innerHTML += `<p>Title: ${article.title}</p>`
        articles.innerHTML += `<p>Num of Comments: ${article.num_comments}</p>`
        articles.innerHTML += `<hr>`
    })

}

main().then()