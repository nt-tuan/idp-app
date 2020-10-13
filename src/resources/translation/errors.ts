const translationArray = [
  {
    "-name": "DefaultError",
    "-xml:space": "preserve",
    value: "Đã có lỗi xãy ra. Bạn vui lòng quay lại sau nhé",
    comment: "Default identity result error message",
  },
  {
    "-name": "DuplicateEmail",
    "-xml:space": "preserve",
    value: "Email này đã được sử dụng",
    comment: "error for duplicate emails",
  },
  {
    "-name": "DuplicateName",
    "-xml:space": "preserve",
    value: "Tài khoản này đã được sử dụng",
    comment: "error for duplicate usernames",
  },
  {
    "-name": "ExternalLoginExists",
    "-xml:space": "preserve",
    value: "A user with that external login already exists.",
    comment: "Error when a login already linked",
  },
  {
    "-name": "InvalidEmail",
    "-xml:space": "preserve",
    value: "Email không hợp lệ",
    comment: "invalid email",
  },
  {
    "-name": "InvalidToken",
    "-xml:space": "preserve",
    value: "Token không hợp lệ",
    comment: "Error when a token is not recognized",
  },
  {
    "-name": "InvalidUserName",
    "-xml:space": "preserve",
    value:
      "Tài khoản không hợp lệ, tài khoản chỉ bao gồm các chữ cái [a...z], [A...Z] và số [0...9]",
    comment: "usernames can only contain letters or digits",
  },
  {
    "-name": "LockoutNotEnabled",
    "-xml:space": "preserve",
    value: "Tài khoản này chưa kích hoạt chức năng khóa",
    comment: "error when lockout is not enabled",
  },
  {
    "-name": "NoTokenProvider",
    "-xml:space": "preserve",
    value: "No IUserTokenProvider is registered.",
    comment: "Error when there is no IUserTokenProvider",
  },
  {
    "-name": "NoTwoFactorProvider",
    "-xml:space": "preserve",
    value: "No IUserTwoFactorProvider for '{0}' is registered.",
    comment: "Error when there is no provider found",
  },
  {
    "-name": "PasswordMismatch",
    "-xml:space": "preserve",
    value: "Tài khoản hoặc mật khẩu không đúng",
    comment: "Error when a password doesn't match",
  },
  {
    "-name": "PasswordRequireDigit",
    "-xml:space": "preserve",
    value: "Mật khẩu phải có ít nhất 1 chữ số [0..9]",
    comment: "Error when passwords do not have a digit",
  },
  {
    "-name": "PasswordRequireLower",
    "-xml:space": "preserve",
    value: "Mật khẩu phải có ít nhất một chữ viết thường [a...z].",
    comment: "Error when passwords do not have a lowercase letter",
  },
  {
    "-name": "PasswordRequireNonLetterOrDigit",
    "-xml:space": "preserve",
    value:
      "Mật khẩu phải có ít nhất một ký tự không là chữ và không là số (kí tự đặc biệt như '!@#$%^&*()')",
    comment:
      "Error when password does not have enough letter or digit characters",
  },
  {
    "-name": "PasswordRequireUpper",
    "-xml:space": "preserve",
    value: "Mật khẩu phải có ít nhất một chữ cái viết hoa [A...Z].",
    comment: "Error when passwords do not have an uppercase letter",
  },
  {
    "-name": "PasswordTooShort",
    "-xml:space": "preserve",
    value: "Mật khẩu quá ngắn",
    comment: "Error message for passwords that are too short",
  },
  {
    "-name": "PropertyTooShort",
    "-xml:space": "preserve",
    value: "{0} cannot be null or empty.",
    comment: "error for empty or null usernames",
  },
  {
    "-name": "RoleNotFound",
    "-xml:space": "preserve",
    value: "Role {0} does not exist.",
    comment: "error when a role does not exist",
  },
  {
    "-name": "StoreNotIQueryableRoleStore",
    "-xml:space": "preserve",
    value: "Store does not implement IQueryableRoleStore<TRole>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIQueryableUserStore",
    "-xml:space": "preserve",
    value: "Store does not implement IQueryableUserStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserClaimStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserClaimStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserConfirmationStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserConfirmationStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserEmailStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserEmailStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserLockoutStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserLockoutStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserLoginStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserLoginStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserPasswordStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserPasswordStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserPhoneNumberStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserPhoneNumberStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserRoleStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserRoleStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserSecurityStampStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserSecurityStampStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "StoreNotIUserTwoFactorStore",
    "-xml:space": "preserve",
    value: "Store does not implement IUserTwoFactorStore<TUser>.",
    comment: "error when the store does not implement this interface",
  },
  {
    "-name": "UserAlreadyHasPassword",
    "-xml:space": "preserve",
    value: "User này đã được thiết lập mật khẩu",
    comment: "error when AddPassword called when a user already has a password",
  },
  {
    "-name": "UserAlreadyInRole",
    "-xml:space": "preserve",
    value: "User already in role.",
    comment: "Error when a user is already in a role",
  },
  {
    "-name": "UserIdNotFound",
    "-xml:space": "preserve",
    value: "UserId not found.",
    comment: "No user with this id found",
  },
  {
    "-name": "UserNameNotFound",
    "-xml:space": "preserve",
    value: "User {0} does not exist.",
    comment: "error when a user does not exist",
  },
  {
    "-name": "UserNotInRole",
    "-xml:space": "preserve",
    value: "User is not in role.",
    comment: "Error when a user is not in the role",
  },
  {
    "-name": "invalid-credential",
    "-xml:space": "preserve",
    value: "Tài khoản và mật khẩu không đúng",
    comment: "Error when a user does not provide valid username and password",
  },
];

export const errorTranslation = translationArray.reduce(
  (d: { [key: string]: string }, current) => {
    return {
      ...d,
      [current["-name"]]: current.value,
    };
  },
  {}
);

export const translateErrorMessage = (message: string) => {
  return Object.keys(errorTranslation).reduce((result, key) => {
    if (message.startsWith(key)) {
      return errorTranslation[key];
    }
    return result;
  }, "Opps, đã có lỗi xãy ra, vui lòng quay lại trong giây lát nhé");
};
