import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group'

import withPortal from '../../hoc/withPortal'
import { ModalButton, ModalProps } from './modal.model'
import './Modal.scss'


const Modal: React.FC<ModalProps> = props => {
  const {
    className,
    contentAlignClass,
    hasTopCloseButton,
    topControls,
    title,
    titleClass,
    description,
    children,
    buttons,
    onCompletedClose: onCompletedCloseCB,
    onClosing: onClosingCB,
    onActionBtnClick: onActionBtnClickCB
  } = props;

  const [isModalOpen, setModalOpenStatus] = useState<boolean>(true);


  const closeModal = () => {
    setModalOpenStatus(false)
  }

  const onCloseBtnClick = () => {
    closeModal()

    //Callback to parent
    if (onClosingCB) onClosingCB()
  }

  const onExited = () => {
    //Callback to parent to unmount Modal component
    onCompletedCloseCB()
  }

  const onActionBtnClick = () => {
    if (onActionBtnClickCB) onActionBtnClickCB(closeModal)
  }

  const renderTopControls = (): JSX.Element | void => {
    if (hasTopCloseButton || topControls) {
      return (
        <div className="modal__top-control-wrapper">
          {hasTopCloseButton && <button className="modal__close-btn" onClick={ onCloseBtnClick } type="button"><i className="icon icon-close"></i></button> }
          {topControls }
        </div>
      );
    }
  }

  const renderButtons = (): JSX.Element | null => {
    if (!buttons) return null

    return (
      <div className="modal__button-wrapper">
        {buttons.map((button: ModalButton): JSX.Element | '' => {
          const { mode, btnClass, btnType = "button", id, text, btnJSX = '' } = button,
            isCloseBtn: boolean = mode === 'close';

          if (mode === 'close' || mode === 'action') {
            return (<button
              className={ cx('btn modal__btn', { 'modal__close-btn': isCloseBtn }, btnClass) }
              type={ btnType }
              id={ id }
              key={ id }
              onClick={ isCloseBtn ? onCloseBtnClick : onActionBtnClick }
            >
              { text }
            </button>);
          }

          return btnJSX
        }
        ) }
      </div>
    )
  }


  return (
    <CSSTransition in={ isModalOpen } classNames="modal-transition" onExited={ onExited } timeout={ 800 } appear unmountOnExit >
      <div className={ cx("modal", contentAlignClass, className) } aria-modal="true">
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
    </CSSTransition>
  )
}


Modal.defaultProps = {
  contentAlignClass: 'modal--align-left',
  hasTopCloseButton: false,
  topControls: undefined,
  title: '',
  titleClass: undefined,
  description: '',
  buttons: undefined
}

export default withPortal(Modal, 'modal-root');
