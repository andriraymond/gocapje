var message = "Login Successfully";

export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(
      "https://andriraymond.github.io/json-repository/accounts.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const users = await response.json();

    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
      console.log("Login successful");
      return { success: true };
    } else {
      console.log("Login Failed");
      return { success: false, error: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.log("Login Failed Error");
    return { success: false, error: "Failed to authenticate" };
  }
};
