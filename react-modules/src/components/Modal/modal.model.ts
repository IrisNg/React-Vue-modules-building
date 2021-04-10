export interface ModalButton {
  mode: 'close' | 'action' | 'other';
  btnClass?: string;
  btnType?: 'button' | 'submit' | 'reset';
  id: string;
  text?: string | JSX.Element;
  btnJSX?: JSX.Element;
}

export interface ModalProps {
  portalNodeId: string;
  className?: string;
  contentAlignClass?: 'modal--align-center' | 'modal--align-left' | 'modal--align-right';
  hasTopCloseButton?: boolean;
  topControls?: JSX.Element;
  title?: string | JSX.Element;
  titleClass?: string;
  description?: string | JSX.Element;
  buttons?: ModalButton[];
  onCompletedClose: () => void;
  onClosing?: () => void;
  onActionBtnClick?: (closeModal: () => void) => void;
}