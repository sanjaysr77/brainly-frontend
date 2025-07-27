import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export function useSearchContent () {
    const [contents, setContents] = useState([])
    const [currentQuery, setCurrentQuery] = useState("");

    function refresh (query = "") {
        setCurrentQuery(query);
        axios.get(`${BACKEND_URL}/api/v1/query`, {
            params: query ? { query } : {},
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            withCredentials: true,
        })
        .then((response) => {
            setContents(response.data.results)
            //console.log(response)
        })
    }

    useEffect (() => {
        refresh()
        let interval = setInterval(() =>{
            refresh(currentQuery)
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    },[])
    
    return {contents, refresh}
}

