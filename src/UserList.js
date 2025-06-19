import React, { useState, useEffect } from "react";
import ListComponent from "./components/ListComponent";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users.");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>📋 User List</h2>

      {loading && <p style={styles.loading}>Loading users...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && (
        <ListComponent
          items={users}
          renderItem={(user) => (
            <div style={styles.card}>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <small>{user.phone}</small>
            </div>
          )}
        />
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "24px",
  },
  loading: {
    textAlign: "center",
    color: "#666",
  },
  error: {
    color: "#c0392b",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    padding: "1rem",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
  },
};

export default UserList;
