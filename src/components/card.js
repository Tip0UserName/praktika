import { openModal } from "./modal";
import { deleteCard, addLike, removeLike } from "./api";

function createCard(name, link, alt, imagePopup, imageInPopup, imageInPopupCaption, likesCount, cardOwnerId, userID, cardId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const likeCountElement = card.querySelector('.card__like-count');
    const cardImage = card.querySelector('.card__image');

    if (cardOwnerId !== userID) {
        deleteButton.classList.add('card__delete-button_inactive');
    }

    cardImage.src = link;
    cardImage.alt = alt;
    card.querySelector('.card__title').textContent = name;
    likeCountElement.textContent = likesCount.length;

    if (likesCount.some(like => like._id === userID)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        const likeAction = likeButton.classList.contains('card__like-button_is-active') ? removeLike : addLike;
        likeAction(cardId)
            .then(res => {
                likeButton.classList.toggle('card__like-button_is-active');
                likeCountElement.textContent = res.likes.length;
            })
            .catch(console.log);
    });

    cardImage.addEventListener('click', () => {
        openModal(imagePopup, null);
        imageInPopup.src = cardImage.src;
        imageInPopup.alt = cardImage.alt;
        imageInPopupCaption.textContent = name;
    });

    deleteButton.addEventListener('click', () => {
        card.remove();
        deleteCard(cardId);
    });

    return card;
}

export {createCard}