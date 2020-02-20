import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../schema/queries';
import { LOGOUT_MUTATION } from '../schema/mutations';

const LogoutButton = () => {
  const [logout] = useMutation(
    LOGOUT_MUTATION,
    {
      update: (cache) => cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null },
      }),
    },
  );

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
