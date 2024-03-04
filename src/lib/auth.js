export const authenticateUser = async (email, password) => {
    try {
        const response = await fetch("https://andriraymond.github.io/json-repository/accounts.json");

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const users = await response.json();

        const user = users.find(user => user.email === email);
        if (user && user.password === password) {
            return { success: true };
        } else {
            return { success: false, error: "Invalid username or password" };
        }
    } catch (error) {
        console.error('Error:', error.message);
        return { success: false, error: "Failed to authenticate" };
    }
};