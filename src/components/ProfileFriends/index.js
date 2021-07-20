import React from 'react';
import Loading from '../Loading';

export function ProfileFriends({ title, list }) {
  return (
    <>
      <h2 className="smallTitle">
        {title} <span className="count">({ list.length === 0 ? <Loading /> : list.length })</span>
      </h2>

      <ul>
        {list.map((item, index) => {
          if(index <= 5){
            return (
              <li key={index}>
                <a href={`${item.html_url}`}>
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