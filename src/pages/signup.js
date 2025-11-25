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

  const inputClasses = "w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h2 className="mb-4 text-2xl md:text-3xl font-bold text-center text-purple-800 font-['Agbalumo']">Dating Account Signup</h2>

        {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm" role="alert">{errorMessage}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4 text-sm" role="alert">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Email Address</label>
            <motion.input
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
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
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Password</label>
            <motion.input
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className={inputClasses}
            />
          </div>

          <div>
              <label className="block text-gray-700 text-xs font-bold mb-1">First Name</label>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First name"
                className={inputClasses}
              />
          </div>
          <div>
              <label className="block text-gray-700 text-xs font-bold mb-1">Last Name</label>
              <motion.input
                whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last name"
                className={inputClasses}
              />
          </div>

          {/* Age Input */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Age</label>
            <motion.input
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              placeholder="Age"
              className={inputClasses}
            />
          </div>

          {/* Gender Radio Buttons */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Gender</label>
            <div className="flex gap-4 items-center h-[38px]">
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
                  <span className="ml-1 text-gray-700 text-sm">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Location</label>
            <motion.input
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="City/Country"
              className={inputClasses}
            />
          </div>

          {/* Education Dropdown */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Education</label>
            <motion.select
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select education</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelors</option>
              <option value="Master's">Masters</option>
              <option value="PhD">PhD</option>
            </motion.select>
          </div>

          {/* Marital Status Dropdown */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-xs font-bold mb-1">Looking For</label>
            <motion.select
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
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
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-xs font-bold mb-1">Tell us about yourself</label>
            <motion.textarea
              whileFocus={{ scale: 1.01, borderColor: "#8A2BE2" }}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="2"
              placeholder="Write something about yourself..."
              className={inputClasses}
            />
          </div>

          {/* Interests Checkboxes */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-xs font-bold mb-1">Interests</label>
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
                  <span className="ml-1 text-gray-700 text-sm">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="form-checkbox text-purple-600 focus:ring-purple-500 h-4 w-4 rounded"
              />
              <span className="ml-2 text-gray-700 text-sm">Subscribe to our dating tips newsletter</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full md:w-auto bg-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
            >
              Sign Up
            </motion.button>
            <Link href="/" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full md:w-auto bg-transparent border-2 border-purple-600 text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-purple-50 transition-colors duration-200 text-sm"
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
