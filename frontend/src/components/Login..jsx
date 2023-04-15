import { useState } from "react";
import axios from "axios";
const Login = ({ setUser }) => {
  const [createAccount, setCreateAccount] = useState("");

  const onSubmitCreateUser = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: createAccount,
        }
      );
      setUser(response.data.user.id);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      onSubmit={onSubmitCreateUser}
    >
      <form className="flex mt-2 my-16">
        <input
          className="grow border-2 border-green-500 rounded-lg focus:outline-green-500 px-2 py-1 text-lg"
          type="text"
          value={createAccount}
          onChange={(e) => setCreateAccount(e.target.value)}
        />
        <input
          className="ml-4 px-2 py-1 bg-green-500 rounded-lg font-bold text-gray-50 w-24 "
          type="submit"
          value="계정 생성"
        />
      </form>
    </div>
  );
};

export default Login;
