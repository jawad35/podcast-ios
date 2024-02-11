export function CheckIsFollowed(userData, emailToCheck) {
    return userData?.some(user => user?.email === emailToCheck);
  }