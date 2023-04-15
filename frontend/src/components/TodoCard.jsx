import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

const TodoCard = ({ Todo, index, isDone, getTodoList, userId }) => {
  const onClickToggle = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/todo/${index}/done`,
      {
        userId,
      }
    );
    if (response.status !== 200) {
      alert("에러 발생");
      return;
    }
    getTodoList();
  };

  const onClickDelete = async () => {
    try {
      console.log(parseInt(userId));
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${index}`,
        {
          data: {
            userId,
          },
        }
      );

      if (response.status !== 200) {
        alert("에러 발생");
        return;
      }

      getTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex my-4">
      {isDone ? (
        <>
          <button className="relative" onClick={onClickToggle}>
            <div className="border-4 border-green-400 w-8 h-8 rounded-xl bg-green-400 p-2"></div>
            <div className="absolute border-4 border-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 scale-75 rounded-xl bg-green-400 p-2"></div>
          </button>
          <div className="text-2xl ml-4 line-through">{Todo}</div>
        </>
      ) : (
        <>
          <button
            onClick={onClickToggle}
            className="border-4 border-green-400 w-8 h-8 rounded-xl"
          ></button>
          <div className="text-2xl ml-4">{Todo}</div>
        </>
      )}
      <button
        className="ml-4 hover:text-sky-500 hover:scale-125"
        onClick={onClickDelete}
      >
        <AiOutlineDelete size={24} />
      </button>
    </div>
  );
};

export default TodoCard;
