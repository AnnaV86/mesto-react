import React, { useContext } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
function Card({ card, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `element-item__delete ${
    isOwn ? 'element-item__delete_type_active' : 'element-item__delete'
  }`;
  const cardLikeButtonClassName = `element-item__like ${
    isLiked ? 'element-item__like like-active' : 'element-item__like'
  }`;

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
          <button type='button' className={cardLikeButtonClassName}></button>
          <h6 className='like-count'>{card.likes.length}</h6>
        </div>
      </div>
      <button type='button' className={cardDeleteButtonClassName}></button>
    </li>
  );
}

export default Card;
