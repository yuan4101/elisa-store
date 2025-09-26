export default interface Notification {
  message?: string,
  type?: NotificationType,
  duration?: number,
  onClose?: () => void,
}

export enum NotificationType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}