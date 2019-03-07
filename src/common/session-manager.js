const store = {
  user: {
    isGuest: undefined,
    sessionId: undefined,
    userName: undefined
  }
};

const getCookieValue = a => {
  const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : '';
};

export const updateUser = (userName, sessionId, isGuest) => {
  document.cookie = `userName=${userName}`;
  document.cookie = `sessionId=${sessionId};`;

  if (isGuest != null && isGuest !== '') {
    document.cookie = 'isGuest=true;';
  }

  store.user = { sessionId, userName, isGuest };
};

export const removeUser = () => {
  document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = 'sessionId=;; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = 'isGuest=;; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  store.user = {
    sessionId: undefined,
    userName: undefined,
    isGuest: undefined
  };
};

export const getUser = () => {
  const userName = getCookieValue('userName');
  const sessionId = getCookieValue('sessionId');
  let isGuest;
  if (getCookieValue('isGuest') !== '') {
    isGuest = 'true';
  }

  store.user = { sessionId, userName, isGuest };
  return store.user;
};
