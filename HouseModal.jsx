import React from 'react';

function Modal(props) {
  return (
    <div>
      <div>{props.data}</div>
      <button onClick={props.onClose}>Close Modal</button>
    </div>
  );
}

export default Modal;
