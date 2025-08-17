import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { getAuthHeaders } from "../utils/firebaseAuth";

export function useContent() {
    const [contents, setContents] = useState([])

    function refresh() {
        getAuthHeaders().then(headers => {
            axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers
            })
            .then((response) => {
                setContents(response.data.content)
                //console.log(response)
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
        });
    }

    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])
    
    return { contents, refresh }
}

