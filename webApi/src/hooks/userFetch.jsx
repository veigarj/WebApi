import { useEffect, useState } from "react";

//  4 Custon Hooks---------------------------------------------------
export const useFetch = (url) => {
  const [data, setData] = useState(null);


// 5 refatorando Post-------------------------------------------------
const [config, setConfig] = useState(null);
const [method, setMethod] = useState(null);
const [callFetch, setCallFetch] = useState(false);

// 6 Loading ---------------------------------------------------------
const [loading, setLoading] = useState(false);

// 7 - Tratando Erro Try e Cach ---------------------------------------
const [error, setError] = useState(null);

// receber os dados de envio e o metodo da requisição
const httpConfig = (data, method) => {
  // condição se o metodo for = a Post
  if(method === 'POST') {
    // configurar
    setConfig({
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    setMethod(method)
}
}

  useEffect(() => {
    const fetchData = async () => {
      // 6 loading-------------------------------------------------------
      setLoading(true)

      // tratamento de erro com Try e Catch-----------------------------
      try {
        const response = await fetch(url)
        const json = await response.json();
  
        setData(json);
      } catch (error) {
        console.log(error)
        
        setError('Houve algum erro ao carregar os dados')
      }
      
      // termina o Loading do setData()
      setLoading(false);
    }

    fetchData();
    // colocar callFetch junto com url = [url, callFetch]
  }, [url, callFetch]);
  
  // 5 refatorando Post ---------------------------------------------------
  useEffect(() => {
    const httpRequest = async () => {

      // se o metodo for = a Post
      if (method === 'POST') {
        // fazer um iarray com url e config ----------
        let fetchOpitions = [url, config]
        
        // fazer a requisição
        const res = await fetch(...fetchOpitions);
        // resposta em json
        const json = await res.json();
  
        // chamar os dados recebidos e trasformar em (json)
        setCallFetch(json);
      }
    }
    // parametros obrigatorios
    httpRequest();
  }, [config, method, url]);
  
  // exportar os metodos data e httpConfig e Loading ----------------------
  return {data, httpConfig, loading, error };
};