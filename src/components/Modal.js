import classNames from 'classnames';
import Popup from 'reactjs-popup';

export const Modal = ({
  className,
  closeButtonClassName,
  hasCloseButton = true,
  hasPadding = true,
  children,
  contentStyle,
  overlayStyle,
  closeOnDocumentClick = true,
  onClose,
  ...rest
}) => {
  const closeButtonDisplay = hasCloseButton ? (
    <button
      data-testid="modal-close"
      type="button"
      className={classNames('absolute top-6 right-6', closeButtonClassName)}
      onClick={onClose}
    >
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.7465 5.71022C18.3564 5.32022 17.7263 5.32022 17.3362 5.71022L12.4453 10.5902L7.55438 5.70021C7.16431 5.31021 6.53419 5.31021 6.14412 5.70021C5.75404 6.09021 5.75404 6.72022 6.14412 7.11022L11.035 12.0002L6.14412 16.8902C5.75404 17.2802 5.75404 17.9102 6.14412 18.3002C6.53419 18.6902 7.16431 18.6902 7.55438 18.3002L12.4453 13.4102L17.3362 18.3002C17.7263 18.6902 18.3564 18.6902 18.7465 18.3002C19.1366 17.9102 19.1366 17.2802 18.7465 16.8902L13.8556 12.0002L18.7465 7.11022C19.1266 6.73022 19.1266 6.09022 18.7465 5.71022Z"
          fill="currentColor"
        />
      </svg>
    </button>
  ) : null;

  return (
    <Popup
      closeOnDocumentClick={closeOnDocumentClick}
      contentStyle={{
        width: 'fit-content',
        padding: 0,
        borderRadius: 16,
        maxHeight: '90%',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...contentStyle
      }}
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.4)', ...overlayStyle }}
      {...rest}
      modal
      nested
      onClose={onClose}
    >
      <div
        className={classNames('relative sm:w-[480px] rounded-[1rem] bg-white', className, {
          'p-5 sm:p-10': hasPadding
        })}
        {...rest}
      >
        {closeButtonDisplay}
        {children}
      </div>
    </Popup>
  );
};
