/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/me';

class Header extends React.Component {
  onLogoutClick = client => {
    localStorage.removeItem('token');
    client.resetStore().catch(err => {});
  };

  renderButtons(client, loading, data) {
    if (loading) {
      return <div />;
    }

    if (data) {
      return (
        <React.Fragment>
          <li>Hi, {data.me.name}!</li>
          <li>
            <a onClick={() => this.onLogoutClick(client)}>Sign Out</a>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <Query query={query}>
        {({ client, loading, data }) => {
          console.log('rendering buttons');
          return (
            <nav>
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">
                  Home
                </Link>
                <ul className="right">
                  {this.renderButtons(client, loading, data)}
                </ul>
              </div>
            </nav>
          );
        }}
      </Query>
    );
  }
}

export default Header;
