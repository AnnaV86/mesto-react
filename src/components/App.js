import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from './CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup';

export const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleAcceptDelete = (card) => {
    setDeletePopupOpen(true);
    setCardDelete(card);
  };

  const handleCardDelete = () => {
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        setCards(cards.concat().filter((el) => el._id !== cardDelete._id));
      })
      .then(setCardDelete({}))
      .then(() => closeAllPopups());
  };

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
    setImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setImagePopupOpen(false);
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

  const handleUpdateAvatar = (avatarLink) => {
    api
      .setUpdateAvatar(avatarLink.avatar)
      .then((newUserData) => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .postNewCard(card)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscClose);
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then((res) => {
        const [userData, cards] = res;
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

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
            cards={cards}
            onCardDelete={handleAcceptDelete}
            onCardLike={handleCardLike}
          />
          <Footer />
          {isEditAvatarPopupOpen && (
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          )}
          {isEditProfilePopupOpen && (
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {isAddPlacePopupOpen && (
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
          )}

          {isDeletePopupOpen && (
            <DeleteCardPopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              acceptDeleteCard={handleCardDelete}
            />
          )}

          {isImagePopupOpen && (
            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
            />
          )}
        </div>
      }
    </CurrentUserContext.Provider>
  );
};
