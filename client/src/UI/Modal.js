import ReactDOM from "react-dom";

const Modal = ({ children, background, styles, dimensions }) => {
  const customStyles = styles || '';
  const style = {
    backgroundImage: background ? `url(${background})` : '',
    backgroundSize: '800px 500px',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: dimensions?.width || '800px',
    height: dimensions?.height || '500px',
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(43,26,9,0.7)] flex items-center justify-center z-50">
      <div className={`flex flex-col p-8 ${customStyles}`} style={style} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default Modal;