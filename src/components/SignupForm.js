import React from 'react';
import { Query, Mutation } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
// import query from '../queries/CurrentUser';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // if (!this.props.data.user && nextProps.data.user) {
    this.props.history.push('/');

    // }
  }

  onSubmit = createUser => ({ name, email, password }) => {
    createUser({ variables: { name, email, password } }).catch(err => {
      const errors = err.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });

    // this.props
    //   .mutate({
    //     variables: { email, password },
    //     refetchQueries: [{ query }],
    //   })
  };

  render() {
    return (
      <Mutation mutation={mutation}>
        {(createUser, { data }) => (
          <div>
            <h3>Sign Up</h3>
            <AuthForm
              signup={true}
              errors={this.state.errors}
              onSubmit={this.onSubmit(createUser)}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

export default SignupForm;
