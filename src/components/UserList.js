import React from 'react';
import { Query } from 'react-apollo';
import query from '../queries/getUsers';

const UserList = () => {
  const renderLoading = () => (
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
  
  return (
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return renderLoading();

        if (error)
          return <div className="errors">`Error! ${error.message}`</div>;

        return (
          <ul className="collection">
            {data.users.map(user => (
              <li key={user.id} className="collection-item">
                {user.name}
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default UserList;
