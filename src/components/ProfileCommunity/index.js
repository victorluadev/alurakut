import React from 'react';

export function ProfileCommunity({ title, list }) {
  return (
    <>
      <h2 className="smallTitle">
        {title} <span className="count">({ list.length === 0 ? '0' : list.length })</span>
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