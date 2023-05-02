import React, { useEffect, useRef, useState } from "react";
import Close from "../assets/svg/close.svg";

export default function Modal({ isActive, setActiveModal, title, breed }) {
  const [showModal, setShowModal] = useState(isActive);
  const modalRef = useRef();

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    setShowModal(isActive);
  }, [isActive]);

  return (
    <>
      {isActive && (
        <div className="modal">
          <div className="modal-container">
            <div className="modal-container__header">
              <h4 className="modal-container__header__title">{breed.name}</h4>
              <button className="modal-container__header__close-button">
                <img src={Close} onClick={closeModal} />
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-image">
                <img
                  className="breed-img"
                  src={
                    breed.image
                      ? breed.image.url
                      : "https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg/image"
                  }
                />
              </div>
              <div className="modal-info">
                <h4>Informações</h4>
                {breed.bred_for && (
                  <div className="info-container">
                    <span className="title">Criado para</span>
                    <span>{breed.bred_for}</span>
                  </div>
                )}
                <div className="info-container">
                  <span className="title">Temperamento</span>
                  <span>{breed.temperament}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </>
  );
}
