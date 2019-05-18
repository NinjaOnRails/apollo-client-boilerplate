import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signin';
import query from '../queries/me';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  // componentWillUpdate(nextProps) {
  //   console.log(this.props);
  //   if (!this.props.data.user && nextProps.data.user) {
  //   hashHistory.push('/dashboard');
  //   }
  // }

  onSubmit = (signIn, client) => ({ email, password }) => {
    signIn({ variables: { email, password } })
      .then(res => {
        this.props.history.goBack();
        localStorage.setItem('token', res.data.login.token);
        client.query({
          query,
        });
      })
      .catch(err => {
        if (err.graphQLErrors) {
          const errors = err.graphQLErrors.map(err => err.message);
          this.setState({ errors });
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <Mutation mutation={mutation} refetchQueries={[{ query }]}>
        {(signIn, { data }) => (
          <div>
            <h3>Sign In</h3>
            <ApolloConsumer>
              {client => (
                <AuthForm
                  errors={this.state.errors}
                  onSubmit={this.onSubmit(signIn, client)}
                />
              )}
            </ApolloConsumer>
          </div>
        )}
      </Mutation>
    );
  }
}

export default SigninForm;
