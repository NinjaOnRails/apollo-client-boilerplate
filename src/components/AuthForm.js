import React from 'react';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '', password: '' };
  }

  renderNameField() {
    return (
      <div className="input-field">
        <input
          placeholder="Name"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} action="" className="col s6">
          {this.props.signup && this.renderNameField()}
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors.map(error => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
