import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

interface ModalButton {
  mode: 'close' | 'action' | 'other';
  btnClass?: string;
  btnType?: 'button' | 'submit' | 'reset';
  id?: string;
  text?: string | JSX.Element;
  btnJSX?: JSX.Element;
}

interface ModalProps {
  portalNodeId: string;
  isOpen: boolean;
  contentAlignClass?: 'modal--align-center' | 'modal--align-left' | 'modal--align-right';
  hasTopCloseButton?: boolean;
  topControls?: JSX.Element;
  title?: string | JSX.Element;
  titleClass?: string;
  description?: string | JSX.Element;
  buttons?: ModalButton[];
}

const Modal: React.FC<ModalProps> = props => {
  const {
    portalNodeId,
    isOpen,
    contentAlignClass,
    hasTopCloseButton,
    topControls,
    title,
    titleClass,
    description,
    children,
    buttons
  } = props;

  const renderTopControls = (): JSX.Element | void => {
    if (hasTopCloseButton || topControls) {
      return (
        <div className="modal__top-control-wrapper">
          {hasTopCloseButton && <button className="modal__close-btn" type="button"><i className="icon icon-close"></i></button> }
          {topControls }
        </div>
      );
    }
  }

  const renderButtons = (): JSX.Element | void => {
    if (buttons) {
      return (
        <div className="modal__button-wrapper">
          {buttons.map((button: ModalButton): JSX.Element | '' => {
            const { mode, btnClass, btnType = "button", id, text, btnJSX = '' } = button,
              defaultBtn: JSX.Element = (
                <button
                  className={ cx('btn modal__btn', { 'modal__close-btn': mode === 'close' }, btnClass) }
                  type={ btnType }
                  id={ id }>
                  { text }
                </button>
              );

            if (mode === 'close' || mode === 'action') {
              return defaultBtn;
            }
            return btnJSX

          }
          ) }
        </div>
      )
    }
  }

  if (!isOpen) {
    return;
  }
  return ReactDOM.createPortal(
    (
      <div className={ cx("modal", contentAlignClass) } aria-modal="true">
        <div className="modal__overlay"></div>
        <div className="modal__container">
          { renderTopControls() }
          <div className="modal__content-wrapper">
            { title && <h2 className={ cx('modal__title', titleClass) }>{ title }</h2> }
            { description && <p className="modal__description">{ description }</p> }
            { children && <div className="modal__block">{ children }</div> }
          </div>
          { renderButtons() }
        </div>

      </div>
    ),
    document.getElementById(portalNodeId)
  )
}


Modal.defaultProps = {
  portalNodeId: '#modal-root',
  isOpen: false,
  contentAlignClass: 'modal--align-left',
  hasTopCloseButton: false,
  topControls: undefined,
  title: '',
  titleClass: undefined,
  description: '',
  buttons: undefined
}

export default Modal;
