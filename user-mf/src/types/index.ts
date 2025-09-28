export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  notifications: boolean;
  emailUpdates: boolean;
}

export interface UserStats {
  ordersCount: number;
  totalSpent: number;
  joinDate: Date;
  lastLogin: Date;
}
