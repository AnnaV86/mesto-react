import React from 'react';
function Card({ card, onCardClick }) {
  return (
    <li className='element-item'>
      <img
        className='element-item__photo'
        src={card.link}
        onClick={() => onCardClick(card)}
      />
      <div className='element-item__title-like'>
        <h2 className='element-item__title'>{card.name}</h2>
        <div className='element-item__like-count'>
          <button type='button' className='element-item__like'></button>
          <h6 className='like-count'>{card.likes.length}</h6>
        </div>
      </div>
      <button type='button' className='element-item__delete'></button>
    </li>
  );
}

export default Card;
