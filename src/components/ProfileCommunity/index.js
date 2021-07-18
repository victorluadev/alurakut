import React from 'react';

export function ProfileCommunity({ title, list }) {
  return (
    <>
      <h2 className="smallTitle">
        {title} ({list.length === 0 ? 'Carregando...' : list.length })
      </h2>

      <ul>
        {list.map((item, index) => {
          if(index <= 5){
            return (
              <li key={item.id}>
                <a href={item.link.length ? item.link : '/404'}>
                  <img src={item.image} />
                  <span>{item.title}</span>
                </a>
              </li>
            )
          }
        })}
      </ul>
    </>
  );
}