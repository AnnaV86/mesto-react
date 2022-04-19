import React from 'react';
import classNames from 'classnames';

function PopupWithForm({ name, title, isOpen, isClose, children }) {
  const classPopup = classNames(`popup popup_type_${name}`, {
    [`popup popup_type_${name}` + ' popup_opened']: isOpen,
  });

  return (
    <div className={classPopup}>
      <div className='popup__container'>
        <h2 className='popup__heading'>{title}</h2>
        <form className='popup__form' name={name} noValidate>
          {children}
        </form>
        <button
          aria-label='Close'
          className='popup__close'
          type='button'
          onClick={() => isClose(false)}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
