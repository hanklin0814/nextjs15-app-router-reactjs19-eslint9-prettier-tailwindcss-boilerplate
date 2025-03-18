import {
  toast,
  ToastOptions,
  ToastPosition,
  TypeOptions,
} from 'react-toastify';

import { Toast } from '@/enums';

export default function showToast(
  message: string,
  type: TypeOptions = 'default',
  position: ToastPosition = 'top-center',
  autoClose: ToastOptions['autoClose'] = 3000
) {
  switch (type) {
    case Toast.INFO:
      toast.info(message, {
        position,
        autoClose,
      });
      break;
    case Toast.SUCCESS:
      toast.success(message, {
        position,
        autoClose,
      });
      break;
    case Toast.WARNING:
      toast.warning(message, {
        position,
        autoClose,
      });
      break;
    case Toast.ERROR:
      toast.error(message, {
        position,
        autoClose,
      });
      break;

    default:
      toast.info(message, {
        position,
        autoClose,
      });
      break;
  }
}
