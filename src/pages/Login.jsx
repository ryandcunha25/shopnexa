import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/shopnexa_api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "/"; 
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="flex justify-center items-center h-[70vh]">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <button className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
