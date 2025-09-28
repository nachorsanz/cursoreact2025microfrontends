export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: string;
  notifications: boolean;
  language: string;
  emailUpdates: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}
