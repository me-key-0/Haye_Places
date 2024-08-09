import React from "react";

import FormInput from "../components/FormInput.component";
import CustomButton from "../components/CustomButton.component"; 
import user from "../services/user.data"
class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }
    
    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await signInWithEmail(email, password); // Call your sign-in function
            this.setState({ email: '', password: '' }); // Reset the state
        } catch (error) {
            console.error("Error signing in with email and password", error);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle(); // Call your Google sign-in function
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    
    render() {
        return (
            <div className="sign-in max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
                <h2 className="text-2xl mb-4">I already have an account</h2>
                <span className="text-gray-600 mb-6 block">Sign in with your email and password</span>
            
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    
                    <div className="buttons flex justify-between mt-4">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={this.handleGoogleSignIn} isGoogleSignIn>
                            Sign In with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

// Simulated sign-in functions
const signInWithEmail = async (email, password) => {
    const existingUser = user.find(u => u.email === email && u.password === password);

    if (existingUser) {
        existingUser.isSignedIn = true; // Mark the user as signed in
        console.log("User signed in successfully:", existingUser);
        return existingUser;
    } else {
        throw new Error("Invalid email or password");
    }
};


const signInWithGoogle = async () => {
    // Replace this with your actual Google sign-in logic
    console.log("Signing in with Google");
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default Signin;
