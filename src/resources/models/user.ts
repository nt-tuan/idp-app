export interface IUser {
  id: string;
  username: string;
  email: string;
  phone?: string;
  image?: string;
  roles: string[];
  fullname?: string;
  lockoutEnable: boolean;
  lockoutEnd?: string;
}

export interface CreatedUser {
  username: string;
  password: string;
  email: string;
  roles: string[];
  lockoutEnable: boolean;
  lockoutEnd?: Date;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
}

export const isUserLocked = (user: IUser) => {
  return (
    user.lockoutEnable === true &&
    user.lockoutEnd != null &&
    new Date(user.lockoutEnd) > new Date()
  );
};

export interface UserSignInLog {
  id: number;
  userName: string;
  acceptedLoginAt: string;
  acceptedConsentAt?: string;
  loginChallenge?: string;
  consentChallenge?: string;
  ipAddress?: string;
  userAgent?: string;
  requestedScope?: string;
  grantedScope?: string;
}
