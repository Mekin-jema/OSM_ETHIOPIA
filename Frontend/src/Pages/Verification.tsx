import { Alert } from "flowbite-react";
import React, { useRef, useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Link } from "react-router-dom";
// import { styles } from "../../style/style";
// import { useActivationMutation } from "@/Redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
}; //

const Verification = () => {
  //   const { token } = useSelector((state: any) => state.auth);
  //   const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast.success("Account Verified Successfully");

  //       setRoute("Login");
  //     }
  //     if (error) {
  //       if ("data" in error) {
  //         const errorData = error as any;
  //         toast.error(errorData.data.message);
  //         setInvalidError(true);
  //       } else {
  //         console.log(error);
  //       }
  //     }
  //   }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const verificationHandler = async () => {
    const verificaionNumber = Object.values(verifyNumber).join("");
    if (verificaionNumber.length < 4) {
      setInvalidError(true);
      return;
    }
    // await activation({
    //   activation_token: token,
    //   activation_code: verificaionNumber,
    // });
  };
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <div className="min-h-screen mt-0">
        {/* {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )} */}
        <div className="flex p-3 max-w-full  mx-auto flex-col md:flex-row md:items-center gap-5 mt-0">
          {/* Left side */}
          <div className="flex-1">
            <div className="bg-[url('/img5.svg')] bg-cover bg-center w-[90%] h-screen bg-transparent ml-5"></div>
          </div>
          {/* Right side */}
          <div className="flex-1">
            <div className="max-w-96 flex mx-auto flex-col gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h1 className="font-bold text-[28px] text-center text-green-600">
                OTP Verification
              </h1>
              <p className="">
                Enter the verification code we just sent to your number +233
                *******53
              </p>
              <div className="w-full flex items-center justify-center mt-2">
                <div className="w-[80px] h-[80px] rounded-full bg-green-600 text-white flex items-center justify-center">
                  <VscWorkspaceTrusted size={40} />
                </div>
              </div>
              <div className=" m-auto flex intem-center justify-around">
                {Object.keys(verifyNumber).map((key, index) => (
                  <input
                    type="text"
                    key={key}
                    ref={inputRefs[index]}
                    className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px]
               flex items-center text-black dark:text-white justify-center text-[18px] 
               font-Poppins outline-none text-center ${
                 invalidError
                   ? "shake border-red-500"
                   : " dark:border-white border-[#0000004a]"
               }`}
                    placeholder=""
                    maxLength={1}
                    value={verifyNumber[key as keyof VerifyNumber]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </div>
              <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                Didn’t receive code?
                <span className="text-[#2190ff] pl-1 cursor-pointer">
                  <Link to="/sign-in"> Resend</Link>
                </span>
              </h5>
              <div className="w-full flex justify-center">
                <button
                  className={`flex flex-row justify-center items-center py-3 px-6 rounded-lg cursor-pointer bg-gray-300 dark:bg-gray-700 min-h-[45px] w-full`}
                  onClick={verificationHandler}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
