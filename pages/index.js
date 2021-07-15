import { useEffect, useState } from 'react';
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'victorluadev';

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [communities, setCommunities] = useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  useEffect(() => {
    async function handleLoadFollowers() {
      await fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(user => user.json())
      .then(user => setFollowers(user))
      .catch(err => console.log(err));

      await fetch(`https://api.github.com/users/${githubUser}/following`)
      .then(user => user.json())
      .then(user => setFollowing(user))
      .catch(err => console.log(err));
    }

    handleLoadFollowers();
  }, []);

  function handleOnSubmit(e){
    e.preventDefault();
    console.log(e)

    const data = new FormData(e.target);

    const community = {
      'title': data.get('title'),
      'image': data.get('image')
    }

    setCommunities([...communities, community]);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet recados="7" fotos="2" videos="7" fas="9" mensagens="4" confiavel="3" legal="3" sexy="2"/>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e)=> handleOnSubmit(e)}>
              <div>
                <input 
                  placeholder="Qual será o nome da sua comunidade?" 
                  name ="title" 
                  aria-label="Qual será o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name ="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({followers.length})
            </h2>

            <ul>
              {followers.map((itemAtual, index) => {
                if(index <= 5){
                  return (
                    <li key={index}>
                      <a href={`${itemAtual.html_url}`}>
                        <img src={`https://github.com/${itemAtual.login}.png`} />
                        <span>{itemAtual.login}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguindo ({following.length})
            </h2>

            <ul>
              {following.map((itemAtual, index) => {
                if(index <= 5){
                  return (
                    <li key={index}>
                      <a href={`${itemAtual.html_url}`}>
                        <img src={`https://github.com/${itemAtual.login}.png`} />
                        <span>{itemAtual.login}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((itemAtual, index) => {
                if(index <= 5){
                  return (
                    <li key={index}>
                      <a href={`community/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
