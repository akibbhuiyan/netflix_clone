"use client";
import { motion } from "framer-motion";
const AccountForm = ({
  formData,
  setFormData,
  showAccountFrom,
  handleSave,
}) => {
  return (
    showAccountFrom && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="px-8 py-8 h-[300] fixed top-[10px] gap-3 flex flex-col items-start right-[10px] bg-black opacity-[0.85] z-[999]">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={formData["name"]}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Enter Your Name"
              className="px-5 py-3 rounded-lg placeholder:text-red-700 text-lg text-[#e5b109] focus:outline-none outline"
            />
            <input
              type="password"
              name="pin"
              value={formData["pin"]}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Enter Your Pin"
              maxLength={4}
              className="px-5 py-3 rounded-lg placeholder:text-red-700 text-lg text-[#e5b109] focus:outline-none outline"
            />
            <button
              className="border p-4 bg-[#e5b109] outline-none rounded-lg text-black text-lg font-bold"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default AccountForm;
