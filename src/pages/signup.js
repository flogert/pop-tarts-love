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

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div>
          <label>Email Address</label>
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
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </div>

        {/* Age Input */}
        <div>
          <label>Age</label>
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
        <div>
          <label>Gender</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        {/* Location Input */}
        <div>
          <label>Location</label>
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
        <div>
          <label>Education</label>
          <select name="education" value={formData.education} onChange={handleChange}>
            <option value="">Select your education level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Marital Status Dropdown */}
        <div>
          <label>Looking For</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select your status</option>
            <option value="short">Short term relationship</option>
            <option value="long">Long term relationship</option>
            <option value="partner">Life Partner</option>
          </select>
        </div>

        {/* Bio Textarea */}
        <div>
          <label>Tell us about yourself</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Write something about yourself..."
          />
        </div>

        {/* Interests Checkboxes */}
        <div>
          <label>Interests</label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Music"
              checked={formData.interests.includes("Music")}
              onChange={handleChange}
            />
            Music
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Sports"
              checked={formData.interests.includes("Sports")}
              onChange={handleChange}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Travel"
              checked={formData.interests.includes("Travel")}
              onChange={handleChange}
            />
            Travel
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Gaming"
              checked={formData.interests.includes("Gaming")}
              onChange={handleChange}
            />
            Gaming
          </label>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            Subscribe to our dating tips newsletter
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="btn-login">
            Sign Up
          </button>
          <Link href="/">
              <button type="button" className="btn-cancel">
                Cancel
              </button>
        </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
