import { useState, useEffect } from 'react';
import Box from "../Box";
import MessageCard from '../MessageCard';

export default function ScrapSection() {
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    async function handleLoadScraps() {
      await fetch('api/scraps', {
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        const data = await response.json();
        console.log(data)
        setScraps(data.records);
      })
      .catch(err => console.log(err));
    }

    handleLoadScraps();
  }, []);
  
  function handleOnSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target);

    const scrap = {
      'github_user': formData.get('github_user'),
      'message': formData.get('message'),
    }

    fetch(`/api/scraps`, {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scrap)
    },
    ).then(async response => {
      const data = await response.json();
      console.log(data)
      setScraps([...scraps, data.scrap]);
    })
  }

  return (
    <>
    <Box>
      <h2 className="subTitle">Mande sua mensagem!</h2>
      <form onSubmit={(e)=> handleOnSubmit(e)}>
        <input 
          placeholder="Digite o seu nome do github"
          aria-label="Digite o seu nome do github"
          name="github_user"
          type="text"
          required
        />
        <input 
          placeholder="Digite a sua mensagem!"
          aria-label="Digite a sua mensagem!"
          name="message"
          type="text"
          required
        />
        <button>
          Adicionar Scrap
        </button>
      </form>
    </Box>
    {scraps.length > 0 ? 
      (
        <Box>
          <h2 className="subTitle">Mensagens <span className="count">({scraps.length})</span></h2>
          <ul>
            {scraps.map((item) => {
              return (
                <MessageCard item={item} key={item.id} />
              )
            })}
          </ul>
        </Box>
      ) : null
    }
    </>
  )
}