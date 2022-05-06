import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link: link,
    });
  };

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        onChange={handleChangeName}
      />
      <span className='placeName-error popup__error'></span>
      <input
        className='popup__input'
        type='url'
        name='placeLink'
        id='placeLink'
        placeholder='Ссылка на картинку'
        required
        onChange={handleChangeLink}
      />
      <span className='placeLink-error popup__error'></span>
      <button className='popup__button' type='submit'>
        Сохранить
      </button>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
