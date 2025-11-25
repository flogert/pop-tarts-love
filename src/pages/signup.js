import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for redirection
import Link from "next/link";

const SignupPage = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    location: "",
    education: "",
    maritalStatus: "",
    bio: "",
    interests: [],
    newsletter: false,
  });
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const [successMessage, setSuccessMessage] = useState(""); // To show success messages
  const router = useRouter(); // For navigation after successful signup

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interests") {
      // Handle multi-checkbox selection
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Account created successfully! Redirecting to your profile...");
        setTimeout(() => {
          router.push("/profile"); // Redirect to profile page after success
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Dating Account Signup</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Error Message */}
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Success Message */}

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Age Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            placeholder="Enter your age"
          />
        </div>

        {/* Gender Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter your city or country"
          />
        </div>

        {/* Education Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Education</label>
          <select name="education" value={formData.education} onChange={handleChange}>
            <option value="">Select your education level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelors</option>
            <option value="Master's">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Marital Status Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Looking For</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select your status</option>
            <option value="short">Short term relationship</option>
            <option value="long">Long term relationship</option>
            <option value="partner">Life Partner</option>
          </select>
        </div>

        {/* Bio Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tell us about yourself</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Write something about yourself..."
          />
        </div>

        {/* Interests Checkboxes */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Interests</label>
          <div className="flex flex-wrap gap-4">
            {["Music", "Sports", "Travel", "Gaming"].map((interest) => (
              <label key={interest} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Subscribe to our dating tips newsletter</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button type="submit" className="btn-login w-full md:w-auto">
            Sign Up
          </button>
          <Link href="/" className="w-full md:w-auto">
              <button type="button" className="btn-cancel w-full">
                Cancel
              </button>
        </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
