/**
 * function that takes a key string like 'name' or 'name.first' and returns a function that takes an object and returns the value of the key in the object
 * @param key - the key to get the value of
 * @param obj - the object to get the value from
 */
export const getObjValue = (key, obj) => {
  const keys = key.toString().split(".");
  let result = obj;
  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result;
};

// alias functions
/* 
import {
  cleanNotifications, // notifications.clean
  cleanNotificationsQueue, // notifications.cleanQueue
  hideNotification, // notifications.hide
  showNotification, // notifications.show
  updateNotification, // notifications.update
  updateNotificationsState, // notifications.updateState
} from "@mantine/notifications"; 
 */

// Most used notification props
/* 
notifications.show({
  id: 'hello-there',
  withCloseButton: true,
  onClose: () => console.log('unmounted'),
  onOpen: () => console.log('mounted'),
  autoClose: 5000,
  title: "You've been compromised",
  message: 'Leave the building immediately',
  color: 'red',
  icon: <IconX />,
  className: 'my-notification-class',
  style: { backgroundColor: 'red' },
  loading: false,
}); 
*/