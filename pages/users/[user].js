import { useEffect, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../../src/components/ProfileRelations';
import { ProfileFriends } from '../../src/components/ProfileFriends';
import { ProfileCommunity } from '../../src/components/ProfileCommunity';
import Box from "../../src/components/Box";
import MainGrid from "../../src/components/MainGrid";

import nookies from 'nookies';

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

export default function FriendsList(props) {
  const githubUser = props.user;

  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    async function handleLoadUserInfo() {
      await fetch(`https://api.github.com/users/${githubUser}`)
      .then(user => user.json())
      .then(user => setUser(user))
      .catch(err => console.log(err));

      await fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(followers => followers.json())
      .then(followers => setFollowers(followers))
      .catch(err => console.log(err));

      await fetch(`https://api.github.com/users/${githubUser}/following`)
      .then(following => following.json())
      .then(following => setFollowing(following))
      .catch(err => console.log(err));
    }

    async function handleLoadCommunities() {
      await fetch(`api/communities?user=${githubUser}`, {
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

    handleLoadUserInfo();
    handleLoadCommunities();
  }, []);

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
              {user.name != null ? user.name : user.login}
            </h1>
            { user.bio &&
              <h2 className="bioTitle">
                {user.bio}
              </h2> 
            }

            <OrkutNostalgicIconSet confiavel="3" legal="3" sexy="3"/>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <ProfileFriends 
              page="friend"
              title="Seguidores"
              list={followers}
              total={user.followers}
            />
            <hr/>
            <a className="link">Ver todos</a>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileFriends 
              page="friend"
              title="Seguindo"
              list={following}
              total={user.following}
            />
            <hr/>
            <a className="link">Ver todos</a>
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

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((response) => response.json())

  if(!isAuthenticated) {

    nookies.destroy(ctx, 'USER_TOKEN');

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const { user } = ctx.query;

  return {
    props: {
      user
    }, 
  }
}