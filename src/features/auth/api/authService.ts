
const authService = {
    login: async (email: string, password: string) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        console.log(res.json());
        return res.json();
    },
    test: async () => {
        const res = await fetch("http://localhost:8000/test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await res.json();
        console.log(data);
        return data;
    }
};

export default authService;