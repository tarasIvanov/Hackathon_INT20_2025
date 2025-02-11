import React, { ReactNode, useEffect } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setNotification } from '@/features/notification/notificationSlice.ts';
// import { useNavigate } from 'react-router-dom';

interface NotificationProps {
  className?: string;
  children?: ReactNode;
  type?: 'success' | 'warning' | 'error';
  message?: string;
  position?: ToastOptions['position'];
  duration?: number;
  redirectUrl?: string;
}

const Notification: React.FC<NotificationProps> = ({
  position = 'bottom-right',
  duration = 3000,
  // redirectUrl,
}) => {
  // const { notification } = useAppSelector((state) => state.notification);


  const [message, type] = notification;

  const notify = () => {
    const options: ToastOptions = {
      position: position,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => dispatch(setNotification[('none', 'none')]),
      style: {
        background: '#1a73e8',
        color: '#fff',
      },
    };

    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'warning':
        toast.warning(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      default:
        toast.info(message, options);
        break;
    }
  };

  useEffect(() => {
    if (message !== 'none') {
      notify();
    }
  }, [notification]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Notification;


