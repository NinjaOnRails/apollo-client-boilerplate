import gql from 'graphql-tag'

export default gql`
mutation CreateUser($name: String!, $email: String!, $password: String!){
  createUser(data:{name:$name, email:$email, password:$password}) {
    token
  }
}
`