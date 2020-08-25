import React from "react";
import cx from "classnames";

export default function Modal({ closeModal, isModalOpen, handleSubmit }) {
  return (
    <div className={cx("modal", { "is-active": isModalOpen })}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="notification notification--narrow">
          <button className="delete" onClick={closeModal}></button>
          <div className="has-text-centered">
            <p>Czy na pewno chcesz zapisać zmiany?</p>
            <div>
              <button className="button is-link" onClick={handleSubmit}>
                Tak
              </button>
              <button className="button is-danger ml-3" onClick={closeModal}>
                Nie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
