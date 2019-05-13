import React from 'react';
import { Mutation, Query } from 'react-apollo';
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

  onSubmit = (signIn, refetch) => ({ email, password }) => {
    signIn({ variables: { email, password } })
      .then(res => {
        localStorage.setItem('token', res.data.login.token);
        refetch();
        this.props.history.goBack();
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
      <Query query={query}>
        {({ refetch }) => (
          <Mutation mutation={mutation}>
            {(signIn, { data }) => (
              <div>
                <h3>Sign In</h3>
                <AuthForm
                  errors={this.state.errors}
                  onSubmit={this.onSubmit(signIn, refetch)}
                />
              </div>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default SigninForm;
