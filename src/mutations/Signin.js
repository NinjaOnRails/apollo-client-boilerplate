import gql from 'graphql-tag';

export default gql`
  mutation Signin($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;
