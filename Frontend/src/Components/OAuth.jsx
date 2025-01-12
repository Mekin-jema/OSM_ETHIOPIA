import { Button } from "flowbite-react";
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";
import { app } from "../Firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../Redux/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      console.log(res);
      const data = await res.json();

      dispatch(signinSuccess(data));
    } catch (error) {
      console.log(error);
      console.log("could not sign in with google");
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        className="text-white bg-gradient-to-r from-green-700
         via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
          focus:ring-green-300"
        outline
        onClick={handleGoogleClick}
      >
        <AiFillGoogleCircle className=" w-6 h-6 mr-2 " />
        <span>Contine with Google</span>
      </Button>
      <Button
        type="button"
        className="text-white bg-gradient-to-r from-green-400
         via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
          focus:ring-green-300"
        outline
        onClick={handleGoogleClick}
      >
        <AiFillFacebook className=" w-6 h-6 mr-2 rounded-full" />
        <span>Contine with facbook</span>
      </Button>
    </div>
  );
};

export default OAuth;
