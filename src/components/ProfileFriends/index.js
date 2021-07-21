import React from 'react';
import Loading from '../Loading';

export function ProfileFriends({ title, list, page, total }) {
  return (
    <>
      <h2 className="smallTitle">
        {title} <span className="count">({ total === 0 ? <Loading /> : total })</span>
      </h2>

      <ul>
        {list.map((item, index) => {
          if(index <= 5){
            return (
              <li key={index}>
                <a href={ page === 'profile' ? `users/${item.login}` : `${item.login}`}>
                  <img src={`https://github.com/${item.login}.png`} />
                  <span>{item.login}</span>
                </a>
              </li>
            )
          }
        })}
      </ul>
    </>
  );
}