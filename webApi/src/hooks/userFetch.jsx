import { useEffect, useState } from "react";

//  4 Custon Hooks

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(url)

      const json = await response.json();

      setData(json);
    }
    fetchData();
  }, [url]);
  
  return {data};
}