import React from "react";
import { motion } from "motion/react";
import useAuthStore from "../store/authStore";
import { formateDate } from "../utils/date";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = async () => {
    //logout logic here
    await logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-9-- bg-opacity-80 backdrop-filter backdrop-blur-lg
    rounded-xl   border-4 border-gray-800"
      style={{ boxShadow: "0 4px 10px 4px rgba(255, 255, 255, 0.2)" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text ">
        Dashboard
      </h2>
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <h3 className="text-2xl font-semibold text-green-500 mb-3">
            Profile Information
          </h3>
          <p className="text-green-200 ">Name: {user.name}</p>
          <p className="text-gray-200 ">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <h3 className="text-2xl font-semibold text-green-500 mb-3">
            Account Activity
          </h3>
          <p className="text-green-200">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-200">
            <span className="font-bold">Last Login: </span>
            {user.lastLogin
              ? formateDate(user.lastLogin)
              : "You just signed up!"}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.6 },
        }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTop={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700
       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
