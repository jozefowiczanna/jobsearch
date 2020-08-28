import React from "react";
import cx from "classnames";

export default function Modal({
  closeModalAndCancelAction,
  isModalOpen,
  addOffer,
  editOffer,
  deleteOffer,
  actionType,
}) {
  const createButtons = () => {
    let text = "";
    let action;
    switch (actionType) {
      case "Edit":
        text = "Czy na pewno chcesz zapisać zmiany?";
        action = editOffer;
        break;
      case "Add":
        text = "Czy na pewno chcesz dodać ofertę?";
        action = addOffer;
        break;
      case "Delete":
        text = "Czy na pewno chcesz usunąć ofertę?";
        action = deleteOffer;
        break;
      default:
        text = "";
        action = null;
    }

    return (
      <div className="has-text-centered">
        <p>{text}</p>
        <div>
          <button className="button is-link" onClick={action}>
            Tak
          </button>
          <button
            className="button is-danger ml-3"
            onClick={closeModalAndCancelAction}
          >
            Nie
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("modal", { "is-active": isModalOpen })}>
      <div
        className="modal-background"
        onClick={closeModalAndCancelAction}
      ></div>
      <div className="modal-content">
        <div className="notification notification--narrow">
          <button
            className="delete"
            onClick={closeModalAndCancelAction}
          ></button>
          {createButtons()}
        </div>
      </div>
    </div>
  );
}
