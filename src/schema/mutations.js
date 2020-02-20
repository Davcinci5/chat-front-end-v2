import  gql  from 'graphql-tag';

export const CREATEGROUP_MUTATION = gql`
  mutation CreateGroup(
    $name: String!,
    $addedFriends:[String]!
  ){
    createGroup(name:$name,addedFriends:$addedFriends){
        id,
        name,
        participants{
          id,
          fullName
        }
    }
  }
`;



export const SEARCH_USER = gql`
  mutation SearchUserQuery(
      $chain: String!
  ){
    searchUsers(chain:$chain){
      id,
      fullName,
      email,
      profileImg
    }
  }
`;

export const FRIEND_REQUEST = gql`
  mutation FriendRequest($friendID:String!){
    friendRequest(friendID:$friendID)
  }
`; 

export const UPLOADIMG = gql`
  mutation UploadFile($file : Upload!){
    uploadFile(file:$file)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const SIGNIN_MUTATION = gql`
mutation Signin(
  $email: String!,
  $password: String! 
) {
  login(
    email: $email,
    password: $password
  ) {
    user {
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
}
`;
export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $fullName: String!,
    $birthday: String!,
    $gender: String!,
    $email: String!,
    $password: String! 
  ) {
    signup(
      fullName: $fullName,
      birthday: $birthday,
      gender: $gender,
      email: $email,
      password: $password
    ) {
      user {
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
      }
    }
  }
`;