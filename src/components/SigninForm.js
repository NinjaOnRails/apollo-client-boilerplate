import React from 'react';
import { Mutation, Query } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signin';
// import query from '../queries/CurrentUser';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // if (!this.props.data.user && nextProps.data.user) {
    // hashHistory.push('/dashboard');
    // }
  }

  onSubmit = signIn => ({ email, password }) => {
    signIn({variables: {email, password}}).catch(err => {
      const errors = err.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
    // this.props
    //   .mutate({
    //     variables: { email, password },
    //     refetchQueries: [{ query }],
    //   })
    //   .catch(err => {
    //     const errors = err.graphQLErrors.map(err => err.message);
    //     this.setState({ errors });
    //   });
  };

  render() {
    return (
      <Mutation mutation={mutation}>
        {(signIn, { data }) => (
          <div>
            <h3>Sign In</h3>
            <AuthForm
              errors={this.state.errors}
              onSubmit={this.onSubmit(signIn)}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

export default SigninForm;
