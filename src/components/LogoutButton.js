import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../schema/queries';
import { LOGOUT_MUTATION } from '../schema/mutations';
import translate from '../i18n/translate';

import Button from '@material-ui/core/Button';

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
    <Button variant="contained" color="primary" onClick={logout}>
      {translate("logout")}
    </Button>
  );
};

export default LogoutButton;
