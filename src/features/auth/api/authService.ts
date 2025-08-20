const BASE_URL = "http://localhost:8000/api/auth";

const authService = {
  // Login
  login: async (email: string, password: string) => {
    console.log("Logging in:", email);
    console.log("Password ", password);
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data; // should return { token, user }
  },

  // Test protected route
  test: async (token: string) => {
    const res = await fetch("http://localhost:8000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  },


  // Register
  register: async (email: string, password: string, first_name: string, last_name: string) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, first_name, last_name }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data.details || "Registration failed");
    return data;
  },

  // Get all users (protected)
  getUsers: async (token: string) => {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Fetching users failed");
    return data;
  },

  // Get user by ID (protected)
  getUserById: async (id: string, token: string) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Fetching user failed");
    return data;
  },
};

export default authService;
