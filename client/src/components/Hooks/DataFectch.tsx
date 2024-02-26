import axios from "axios";
import { useEffect, useState } from "react";
interface smaltodo {
  title: string;
  description: string;
  done: boolean;
  id: number;
}

interface TodoFectj {
    data : smaltodo[],
    loading : boolean,
    error : boolean
}


export  function useTodofetch() : TodoFectj {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res  = await axios.get("http://localhost:8080/user/getTodos", {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
            });
            
            setData(res.data.alltodo);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
        };
        fetchData();
    }, []);
    
    return { data, loading, error };
}
