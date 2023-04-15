import { useState } from "react";
import axios from "axios";

const Todo = ({ user, getTodoList }) => {
  const [createTodo, setCreateTodo] = useState("");

  const onSubmitCreateTodo = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          todo: createTodo,
          // isDone: false,
          userId: parseInt(user),
        }
      );
      getTodoList();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitCreateTodo}>
      <input
        className="grow border-2 border-green-200 rounded-lg focus:outline-green-500 px-2 py-1 text-lg"
        type="text"
        value={createTodo}
        onChange={(e) => setCreateTodo(e.target.value)}
      />
      <input
        type="submit"
        className="ml-4 px-2 py-1 bg-green-400 rounded-lg text-gray-50"
        value="새 투두 생성"
      />
    </form>
  );
};

export default Todo;
