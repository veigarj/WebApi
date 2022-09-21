import './App.css';
import { useEffect, useState } from 'react';

// 4 custom Hooks usado para metodos GET e POST
import { useFetch } from './hooks/userFetch';

// com Hooks customs altera apenas Url e config para outras requisicoes----
// Url base da requisição
const url = 'http://localhost:3000/products';

function App() {

  // Config useState---------------------------

  // salvar o conteudo com useState
  // products = salvar
  // setProducs = colocar em algum lugar
  const [product, setProduc] = useState([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  // 1 - resgatando dados --------------------
  
  // 4 - custon -----------------------------------------------------------
  // configurar para usar customs Hooks {data: items} --- docs na pasta hooks
  
  // colocar ( item ) para GET e ( httpConfig ) para Post
  // destructure -------/---/-------
  const {data: items, httpConfig, loading, error } = useFetch(url)
  
  // 1 resgatar Dados
  // useEffect(() => {
  //   async function fetchData() {
  //     // resposta
  //     const res = await fetch(url);
  //     // invoco o metodo em Json da const res
  //     const data = await res.json();
  //     // trasforma os dados puxados
  //     setProducs(data);
  //   }
  //   // invoca a função que com a requisição Fetch --
  //   fetchData();
  // }, []);

  // 2 - Add de Produtos -------------------------------

  // config da infos que vao ser enviada via form-------
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    };

    // // Requisição de envio Post --------------------
    // const res = await fetch(url, {
    //   // config como vai ser a requisição do metodo
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product)
    // });

    // // 3 - caregamento dinaico ---------------------
    // const addedProduct = await res.json()

    // // Pega o conteudo que ta sendo renderizado em (setProducs) e faz um spred com a const (addedProduct) 
    // setProducs((prevProduct) => [...prevProduct, addedProduct ]);

    // 5 refatorando Post
    httpConfig(product, "POST");


    // Reseta os states ao final do envio -------------------------------
    setName('')
    setPrice('')

  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 Loading --------------------------------------------------*/} 
      {loading && <p>Carregando dados...</p>}
      {/* Tratamento de Error */}
      {error && <p>{error}</p>} 
      {!loading && ( 
      <ul>
        {/* chamar cada item individual de products */}
        {/* para usar como customs Hooks tem que fazer a validação items && items */}
        {items && items.map((product) => (
          // imprimir cada propriedade do product com os parametros
          <li key={product.id}>{product.name} - R$ {product.price} </li>
        ))}
      </ul>
      )}
      {/* Criar formulario */}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
          {/* criar o formulario com value={name} e onChange=setName */}
            <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço
            <input type='nuber' value={price} name='name' onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/* 7 - State de Loading no post -------------------------------*/}
          {/* Loading botao pos click  */}
          {loading && <input type="submit" disabled value='Aguarde..' />}
          {/* Loading botao some */}
          {!loading && <input type="submit" value='Criar' />}

        </form>
      </div>
    </div>
  );
}

export default App;