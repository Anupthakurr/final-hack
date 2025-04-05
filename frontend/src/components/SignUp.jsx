import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    console.log('Navigate to login');
    // Add your navigation logic here
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    // Validate inputs
    if (!name || !email || !password || !image) {  // Ensure image is provided
      setError("Please fill in all required fields including an image.");
      setLoading(false);
      return;
    }
    // Create FormData for mixed data (file + text)
    const formData = new FormData();
    
    // Append text fields
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    
    
    // Append file - using 'image' as the field name to match backend
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user", 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setSuccess("Account created successfully!");
      console.log("Registration successful:", response.data);
      
      // You could redirect to login page here or directly log the user in
      // e.g., localStorage.setItem('token', response.data.token);
      
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          <form onSubmit={submitHandler}>  
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input 
                  id="name"
                  type="text" 
                  placeholder="Enter Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="Enter Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                  required
                />
              </div>
              
             
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input 
                  id="password"
                  type="password" 
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <input 
                  id="image"
                  type="file" 
                  name="image" 
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                  accept="image/*"
                />
              </div>
              
              <button 
                type="submit"  
                disabled={loading}
                className={`w-full text-white py-3 rounded-lg transition duration-300 font-semibold ${
                  loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'Processing...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="text-center my-4">
            <span className="text-gray-600">Already have an account?</span>
          </div>
          
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 text-gray-800 py-3 rounded-lg hover:bg-yellow-500 transition duration-300 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;