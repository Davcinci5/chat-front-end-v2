import  gql  from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
        id
        fullName
        birthday
        gender
        email
        profileImg
        friendsList{
          id
          fullName
          email
        }
        reqSent{
          id
          fullName
          email
        }
        reqReceived{
          id
          fullName
          email
        }
        groups{
          id,
          name,
          participants{
            id,
            fullName
          }
        }
    }
  } 
`;

