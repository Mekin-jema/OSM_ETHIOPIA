import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const AccountSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    confirmCurrentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    const event = {
      target: {
        name: 'phone',
        value: value,
      },
    };
    handleChange(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword || formData.confirmCurrentPassword !== formData.currentPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", formData);
    // Add API call or submission logic here
  };

  return (
    <div className="relative max-w-full mx-auto bg-[#E9EFEC] rounded-[20px] overflow-hidden border border-[#92e3a9] ml-[88px] pl-[42px] mt-[14px] mr-[31px] h-full">
      <div className="max-w-[1127px]">
        <div className="font-semibold text-black text-[20px] mb-[36px] mt-[37px]">
          Account Settings
        </div>

        <form onSubmit={handleSubmit}>
          <div className="font-semibold text-black text-[18px] mb-4">
            Details
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-[32px]">
              <label className="block w-[299px]">
                <span className="text-black ml-[11px]">First Name</span> <br />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="h-[45px] w-full mt-2 bg-white rounded-[10px] p-3 border"
                />
              </label>

              <label className="w-[299px]">
                <span className="text-black ml-[11px]">Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full mt-2 bg-white rounded-[10px] p-3 border"
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-[32px]">
              <label className="block w-[299px]">
                <span className="text-black ml-[11px]">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full mt-2 bg-white rounded-[10px] p-3 border"
                />
              </label>

              <label className="block w-[299px] flex flex-col gap-3 item-center">
                <span className="text-black ml-[11px]">Phone</span>
                <div className="w-full">
                  <PhoneInput
                    country={'et'}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    enableSearch={true}
                    disableDropdown={false}
                    inputProps={{
                      name: 'phone',
                      required: true,
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '10px',
                      border: '1px solid #ddd',
                    }}
                  />
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 bg-[#00432f] w-full md:w-48 h-[45px] text-white rounded-[10px] text-lg font-semibold"
          >
            Save Changes
          </button>

          <div className="font-semibold text-black text-lg mt-10">Password</div>
          <div className="flex flex-col md:flex">
            <div className="items-center gap-[32px] flex flex-col md:flex-row">
              <label className="block w-[299px]">
                <span className="text-black ml-[11px]">Change Password</span>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Put your current password"
                  className="w-full mt-2 bg-white rounded-[10px] p-3 border"
                />
              </label>
              <label className="block w-[299px] h-full mt-5">
                <input
                  type="password"
                  name="confirmCurrentPassword"
                  value={formData.confirmCurrentPassword}
                  onChange={handleChange}
                  placeholder="Confirm your current password"
                  className="w-full mt-2 bg-white rounded-[10px] p-3 border mb-0"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <span className="text-black ml-[11px]">New Password</span>
              <div className="flex flex-col md:flex-row gap-[32px]">
                <label className="block md:col-span-2 w-[299px]">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Put your new password"
                    className="w-full mt-2 bg-white rounded-[10px] p-3 border"
                  />
                </label>
                <label className="block md:col-span-2 w-[299px]">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full mt-2 bg-white rounded-[10px] p-3 border"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="w-[630px] h-[45px] my-[26px] md:flex-row flex flex-col gap-[24px] items-center justify-center">
            <p className="text-[#00432F] underline text-center font-semibold h-full flex items-center justify-center">
              Forgot Your Password?
            </p>
            <button
              type="submit"
              className="bg-[#00432f] w-full md:w-48 h-[45px] text-white rounded-[10px] text-lg font-semibold"
            >
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
