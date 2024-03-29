"use client";
import React, { useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import InputUI from "@/components/common/InputUI";
import NextImage from "@/components/common/NextImage";
import { dispatch, useSelector } from "@/redux/store";
import { updateUser } from "@/redux/slices/user";

const UserProfile = () => {
  const user = useSelector(state => state.user.userInfo)
  console.log("userdata",user);
  const [formData, setFormData] = useState({
    first_name: user.first_name || "", // Set default values to user's existing data
    last_name: user.last_name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });

  // Handle change for each input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the corresponding field in formData
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = user.id;
    console.log("iduser",id); // Replace with actual user ID
    dispatch(updateUser(id, formData));
  };
  return (
    <>
      <div className="container mt-10 bg-[#232323] p-9 rounded-2xl">
        <div className="flex flex-col items-center">
          <div className="relative w-[100px] h-[100px]">
            <NextImage
              src="/images/user.svg"
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="mt-5 text-3xl font-bold">{user?.first_name +" "+ user?.last_name}</h1>
          <form className="w-full mx-auto mt-20" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2 md:gap-x-20">
            <InputUI
              name="first_name"
              label="First Name"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleInputChange}
              placement="outside"
              size="lg"
            />
            <InputUI
              name="last_name"
              label="Last Name"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleInputChange}
              placement="outside"
              size="lg"
            />
            <InputUI
              name="email"
              label="Email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              placement="outside"
              size="lg"
            />
            <InputUI
              name="mobile"
              label="Mobile Number"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              placement="outside"
              size="lg"
            />
          </div>
          <div className="flex justify-center mt-10 md:mt-32">
            <ButtonUI type="submit" size="lg" className="w-full md:w-fit md:px-28">
              Update Profile
            </ButtonUI>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
