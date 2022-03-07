import axios from "axios";
const baseUrl = 'http://localhost:3001/notes';

// use async as we want to get data at the same time as loading page

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createNew = async (content) => {
    const note = { content, done: false };

    const res = await axios.post(baseUrl, note);
    return res.data;
}

export default { getAll, createNew }; 