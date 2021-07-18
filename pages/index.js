import { useEffect, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { ProfileFriends } from '../src/components/ProfileFriends';
import { ProfileCommunity } from '../src/components/ProfileCommunity';
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";

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
  const [communities, setCommunities] = useState([]);

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

    async function handleLoadCommunities() {
      await fetch('api/communities', {
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        const data = await response.json();
        setCommunities(data.records);
      })
      .catch(err => console.log(err));
    }

    handleLoadFollowers();
    handleLoadCommunities();
  }, []);

  function handleOnSubmit(e){
    e.preventDefault();
    console.log(e)

    const formData = new FormData(e.target);

    const community = {
      'title': formData.get('title'),
      'image': formData.get('image'),
      'link': formData.get('link'),
      'owner': githubUser
    }

    fetch('/api/communities', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(community)
    },
    ).then(async response => {
      const data = await response.json();
      setCommunities([...communities, data.community]);
    })

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
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Qual o link para sua comunidade?" 
                  name ="link" 
                  aria-label="Qual o link para sua comunidade?"
                  type="text"
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
            <ProfileFriends 
              title="Meus amigos"
              list={followers}
            />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileFriends 
              title="Seguindo"
              list={following}
            />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileCommunity
              title="Comunidades"
              list={communities}
            />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
