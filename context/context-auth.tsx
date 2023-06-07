import React from 'react';

const AuthContext = React.createContext({
  updateTaskId: 0,
});

AuthContext.displayName = 'Auth Context';

export default AuthContext;
