import axios from "axios";

const api = axios.create({baseURL: "https://nc-marketplace-api-b05f.onrender.com/api"})


function getArtilces(){
    return api.get("/articles")
    .then((res) =>{
        console.log(res)
    })
}

getArtilces()