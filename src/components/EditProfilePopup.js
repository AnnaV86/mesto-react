import React, { useState, useContext, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from './CurrentUserContext';

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input'
        type='text'
        name='profileName'
        id='profName'
        required
        minLength='2'
        maxLength='30'
        value={name}
        onChange={handleChangeName}
      />
      <span className='profName-error popup__error'></span>
      <input
        className='popup__input'
        type='text'
        name='profileAboutMe'
        id='profAboutMe'
        required
        minLength='2'
        maxLength='200'
        value={description}
        onChange={handleChangeDescription}
      />
      <span className='profAboutMe-error popup__error'></span>
      <button className='popup__button' type='submit'>
        Сохранить
      </button>
    </PopupWithForm>
  );
};
