import { useState, useEffect } from 'react';
import { usersApi } from '../../services/usersApi';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersApi.getAllUsers({ page: currentPage, limit: 10 });
      setUsers(data.data);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'SUPERADMIN':
        return 'badge-superadmin';
      case 'ADMIN':
        return 'badge-admin';
      case 'AGENCY':
        return 'badge-agency';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>👥 Users Management</h1>
        <p className="subtitle">View and manage all system users</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <p>❌ Error: {error}</p>
          <button onClick={fetchUsers} className="btn-retry">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="users-stats">
            <div className="stat-card">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">{pagination?.total || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Current Page</span>
              <span className="stat-value">{pagination?.page || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Pages</span>
              <span className="stat-value">{pagination?.pages || 0}</span>
            </div>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="user-name">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                          {user.isActive ? '✓ Active' : '✗ Inactive'}
                        </span>
                      </td>
                      <td className="date-cell">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ← Previous
              </button>

              <span className="page-info">
                Page {currentPage} of {pagination.pages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="pagination-btn"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsersPage;
