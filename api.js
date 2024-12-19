import axios from "axios";

const api = axios.create({ baseURL: "https://mithril-news.onrender.com/api" });

function getArticles(slug, sortBy= "", order="") {
    let url = slug ? `/articles?topic=${slug}` : '/articles';
    if (sortBy && order) {
        const andOrQuestionMark = slug? "&" : "?";
        url += andOrQuestionMark
        url += `sort_by=${sortBy}&order=${order}`;
    }
    console.log(url);
    return api.get(url)
        .then((res) => {
            console.log(res.data);
            return res.data;
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

function getComments(articleId, optionalQuery = {}) {
    const { limit = 10, p = 1 } = optionalQuery;
    const url = `/articles/${articleId}/comments?p=${p}&limit=${limit}`;
    return api.get(url)
        .then((res) => res.data)
        .catch((error) => {
            console.error(error.message);
            throw error;
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

function handleArticleVotes(article_id, vote){
    return api.patch(`/articles/${article_id}`, { inc_votes: vote})
    .then((res) => {
        console.log(res)
    })
}

function handleCommentVotes(comment_id, vote) {
    return api.patch(`/comments/${comment_id}`, { inc_votes: vote })
        .then((res) => {
            console.log('Successfully updated comment:', res.data);
            // Optionally update the UI or state with the new votes
           
        })
        .catch((err) => {
            console.error('Failed to update comment votes:', err.message);
            if (err.response && err.response.status === 404) {
                console.error('Comment not found:', comment_id);
            } else {
                console.error('Unexpected error:', err);
            }
            // Optionally show an error message to the user here
        });
}

function handleCommentDelete(comment_id){
    return api.delete(`comments/${comment_id}`)
    .then((res)=>{
        console.log(res.status)
    })
}


function getTopics(){
    return api.get(`topics`)
    .then((res) => {
        return res
    })
}




export {getArticles, getArticleData, getComments, postComment, handleCommentVotes, handleArticleVotes, handleCommentDelete, getTopics};
