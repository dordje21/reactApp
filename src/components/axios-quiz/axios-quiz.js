import axios from "axios";

export default axios.create({
    baseURL: 'https://quizreactapp-c62a9-default-rtdb.europe-west1.firebasedatabase.app'
})