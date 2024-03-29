import React, { useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import InputUI from "@/components/common/InputUI";
import ButtonUI from "@/components/common/ButtonUI";
import { dispatch, useSelector } from "@/redux/store";
import { signUp } from "@/redux/slices/user";
import { toast } from 'react-toastify';

const RegisterModal = ({ isOpen, onOpenChange }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("user");
  const [type, setType] = useState("normal");
  const loading = useSelector(state => state.user.isLoading)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp({ 
        first_name: firstName, 
        last_name: lastName, 
        email: email, 
        password: password, 
        key: key, 
        type: type 
      }));
      toast.success('SignUp successful', { position: 'top-center' });

      onOpenChange();
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again later.', { position: 'top-center' });
    }
  };

  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
      >
        <div className="pt-10 pb-20">
          <div className="pb-4 border-b border-gray-500">
            <h3 className="text-xl font-semibold">Sign Up</h3>
          </div>
          <form onSubmit={handleSubmit} className="mt-20 space-y-8">
            <InputUI
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              value={firstName}
              onChange={setFirstName}
              placement="outside"
              required
            />
            <InputUI
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              value={lastName}
              onChange={setLastName}
              placement="outside"
              required
            />
            <InputUI
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={setEmail}
              placement="outside"
              required
            />
            <InputUI
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              placement="outside"
              required
            />
            <ButtonUI type="submit" variant="bordered" size="lg" className="w-full">
              Continue
            </ButtonUI>
          </form>
          <h6 className="text-center text-[#828282] mt-5">
            Already have an account?{" "}
            <span className="text-primary">Log In</span>
          </h6>
        </div>
      </ModalUI>
    </>
  );
};

export default RegisterModal;
