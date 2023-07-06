import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, likes, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id; //card.owner.id
  const cardDeleteButtonClassName = `element__delete ${
    !isOwn && "element__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__icon ${
    isLiked && "element_active"
  }`; //isLiked ? "element_active" : "element__icon"

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element__card">
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="element__image"
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__count-likes">{likes}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
