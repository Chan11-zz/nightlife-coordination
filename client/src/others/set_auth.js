import axios from 'axios';
export default function setAuth(tk){
    if(tk){
        axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}