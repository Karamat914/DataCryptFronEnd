import React, { useState } from "react";
import ModalUI from "@/components/common/ModalUI";
import InputUI from "@/components/common/InputUI";
import ButtonUI from "@/components/common/ButtonUI";
import { signIn } from "@/redux/slices/user";
import { dispatch, useSelector } from "@/redux/store";
import RegisterModal from "./RegisterModal";
import { toast } from 'react-toastify';

const LoginModal = ({ isOpen, onOpenChange }) => {

  const loading = useSelector(state => state.user.isLoading)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false); // State variable to control RegisterModal visibility

  const handleRegisterModalOpen = () => {
    setRegisterModalOpen(true); // Function to open the RegisterModal
  };

  const handleRegisterModalClose = () => {
    setRegisterModalOpen(false); // Function to close the RegisterModal
  };
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async () => {
    debugger;
    console.log('loading---', loading);
    try {
      const getError = await dispatch(signIn({email: mail, password: password, type:"normal"}));
      console.log('getError---', getError);
    toast.success('Login successful!', { position: 'top-center' });

      // reset();
      // if (getError) setError('afterSubmit', { message: getError })
    } catch (error) {
      console.log('login fail c =====',error);
      // if (isMountedRef.current) {
      //   setError('afterSubmit', error);
      // }
    }
  }
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
            <h3 className="text-xl font-semibold">Join Nopal Das Rewards</h3>
          </div>
          <form className="mt-20 space-y-10">
            <InputUI
              onChange={setMail}
              name="email"
              label="Email"
              placeholder="Enter email"
              placement="outside"
            />
            <InputUI
              onChange={setPassword}
              name="password"
              label="Password"
              placeholder="Enter password"
              placement="outside"
            />
            <ButtonUI onClick={loginUser} isLoading={loading} variant="bordered" size="lg" className="w-full">
              Continue
            </ButtonUI>
          </form>
          <h6 className="text-center text-[#828282] mt-5">
            Don’t have an account yet?{" "}
            <span  className="text-primary cursor-pointer"
              onClick={handleRegisterModalOpen}>Sign up</span>
          </h6>
        </div>
      </ModalUI>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onOpenChange={handleRegisterModalClose} // Close RegisterModal when needed
      />
    </>
  );
};

export default LoginModal;
