import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import { CurrentUserContext } from './CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.resolve(api.getUserInfo())
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({});
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((newUserData) => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        <div className='page'>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
          {isEditAvatarPopupOpen && (
            <PopupWithForm
              name='avatar'
              title='Обновить аватар'
              isOpen={isEditAvatarPopupOpen}
              isClose={closeAllPopups}
            >
              <input
                className='popup__input'
                type='url'
                name='avatarLink'
                id='avatarLink'
                placeholder='Ссылка на картинку'
                required
              />
              <span className='avatarLink-error popup__error'></span>
              <button className='popup__button' type='submit'>
                Сохранить
              </button>
            </PopupWithForm>
          )}
          {isEditProfilePopupOpen && (
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {isAddPlacePopupOpen && (
            <PopupWithForm
              name='place'
              title='Новое место'
              isOpen={isAddPlacePopupOpen}
              isClose={closeAllPopups}
            >
              <input
                className='popup__input'
                type='text'
                name='placeName'
                id='placeName'
                placeholder='Название'
                required
                minLength='2'
                maxLength='30'
              />
              <span className='placeName-error popup__error'></span>
              <input
                className='popup__input'
                type='url'
                name='placeLink'
                id='placeLink'
                placeholder='Ссылка на картинку'
                required
              />
              <span className='placeLink-error popup__error'></span>
              <button className='popup__button' type='submit'>
                Сохранить
              </button>
            </PopupWithForm>
          )}

          {isDeletePopupOpen && (
            <PopupWithForm
              name='delete'
              title='Вы уверены?'
              isOpen={isDeletePopupOpen}
              isClose={closeAllPopups}
            >
              <button className='popup__button' type='submit'>
                Да
              </button>
            </PopupWithForm>
          )}

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
