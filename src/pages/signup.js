import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

const SignupPage = () => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interests") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

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
          router.push("/profile");
        }, 2000);
      } else {
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200";

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-800">Dating Account Signup</h2>

        {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorMessage}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl">
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className={inputClasses}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className={inputClasses}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Age Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              placeholder="Enter your age"
              className={inputClasses}
            />
          </div>

          {/* Gender Radio Buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="form-radio text-purple-600 focus:ring-purple-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter your city or country"
              className={inputClasses}
            />
          </div>

          {/* Education Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Education</label>
            <motion.select
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select your education level</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelors</option>
              <option value="Master's">Masters</option>
              <option value="PhD">PhD</option>
            </motion.select>
          </div>

          {/* Marital Status Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Looking For</label>
            <motion.select
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select your status</option>
              <option value="short">Short term relationship</option>
              <option value="long">Long term relationship</option>
              <option value="partner">Life Partner</option>
            </motion.select>
          </div>

          {/* Bio Textarea */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tell us about yourself</label>
            <motion.textarea
              whileFocus={{ scale: 1.02, borderColor: "#8A2BE2" }}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about yourself..."
              className={inputClasses}
            />
          </div>

          {/* Interests Checkboxes */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Interests</label>
            <div className="flex flex-wrap gap-4">
              {["Music", "Sports", "Travel", "Gaming"].map((interest) => (
                <label key={interest} className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    className="form-checkbox text-purple-600 focus:ring-purple-500 h-4 w-4 rounded"
                  />
                  <span className="ml-2 text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mb-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="form-checkbox text-purple-600 focus:ring-purple-500 h-4 w-4 rounded"
              />
              <span className="ml-2 text-gray-700">Subscribe to our dating tips newsletter</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full md:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Sign Up
            </motion.button>
            <Link href="/" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full md:w-auto bg-transparent border-2 border-purple-600 text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-purple-50 transition-colors duration-200"
              >
                Cancel
              </motion.button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;
