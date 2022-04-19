import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  let userId = '';
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then((res) => {
        const [cardsArray, userData] = res;
        userId = userData._id;
        setUserName(userData.name);
        setUserAvatar(userData.avatar);
        setUserDescription(userData.about);
        setCards(cardsArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__user'>
          <img
            className='profile__avatar'
            src={userAvatar}
            alt='Фото профиля'
          />
          <div className='profile__avatar-overlay'>
            <button
              className='profile__avatar-editing'
              type='button'
              onClick={onEditAvatar}
            ></button>
          </div>

          <div className='profile__info'>
            <div className='profile__name-edit'>
              <h1 className='profile__name'>{userName}</h1>
              <button
                className='profile__editing'
                aria-label='Edit'
                type='button'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__about-me'>{userDescription}</p>
          </div>
        </div>
        <button
          className='profile__new'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='photo-card'>
        <ul className='elements'>
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
