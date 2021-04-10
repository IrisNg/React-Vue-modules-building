import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'


interface WithPortalProps {
  portalNodeId: string
}

const withPortal = (WrappedComponent: React.ComponentType<any>, defaultPortalNodeId:string) => {

  const WithPortal:React.FC<WithPortalProps> = (props) => {

    const { portalNodeId = defaultPortalNodeId }= props;

    const mount = document.getElementById(portalNodeId)!,
      el = document.createElement("div");


    useEffect((): () => void => {
      mount.appendChild(el);

      return () => mount.removeChild(el);
    }, [el, mount]);


    return ReactDOM.createPortal(
      <WrappedComponent { ...props }></WrappedComponent>
      , el!)
  }


  return WithPortal
}

export default withPortal
