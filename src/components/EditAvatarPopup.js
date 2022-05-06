import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
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
  );
};

export default EditAvatarPopup;
