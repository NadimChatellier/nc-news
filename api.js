import axios from "axios";

const api = axios.create({ baseURL: "https://mithril-news.onrender.com/api" });

function getArticles() {
    return api.get("/articles")
        .then((res) => {
            console.log(res.data)
            return(res.data);
        })
        .catch((error) => {
            console.error("Error fetching articles:", error.message);
        });
}

function getArticleData(articleID) {
    return api.get(`/articles/${articleID}`)
        .then((res) => {
            console.log(res.data)
            return(res.data);
        })
        .catch((error) => {
            console.error("Error fetching articles:", error.message);
        });
}

function getComments(article_id) {
    return api.get(`/articles/${article_id}/comments`)
        .then((res) => {
            console.log(res.data)
            return(res.data);
        })
        .catch((error) => {
            console.error(error.message);
        });
}

function postComment(articleId, newComment) {
    console.log(articleId + "<<<<<<<< in api.js")
    return api.post(`/articles/${articleId}/comments`, newComment)
        .then((res) => {
            console.log(res.data)
            return(res.data);
        })
        .catch((error) => {
            console.error('Error posting comment:', error);
            throw new Error(`Failed to post comment: ${error.message}`);
        });
}




export {getArticles, getArticleData, getComments, postComment};
