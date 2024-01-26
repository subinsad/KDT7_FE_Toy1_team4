import React, { useEffect, useRef } from "react";
import "./Dialog.scss";
import Button from "./Button";
import Heading from "./Heading";

const Dialog = ({ openModal, closeModal, children, title, className = "" }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className={"dialog " + className}>
      {title && <Heading tag={"h2"} text={title} />}
      {children}
      <Button onClick={closeModal} className={"btn-close"} />
    </dialog>
  );
};

export default Dialog;
