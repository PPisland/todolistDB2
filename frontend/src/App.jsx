import { useEffect, useState } from "react";
import Login from "./components/Login.";
import Todo from "./components/Todo";
import axios from "axios";
import TodoCard from "./components/TodoCard";

function App() {
  const [user, setUser] = useState("");
  const [toDolist, setTodoList] = useState();

  const getTodoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${user}`
      );

      if (response.status !== 200) {
        alert("에러 발생");
      }

      setTodoList(response.data.todos);
      // console.log(toDolist.todos);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold">AWESOME TO DO LIST 💎</h1>
      <div className="absolute top-2 right-4 text-2xl">계정아이디 : {user}</div>
      <div>
        <div className="mt-8 text-sm font-semibold">
          If I only had an hour to chop down a tree, I would spend the first 45
          minutes sharpening my axe, Abrabam Lincoln
        </div>
        <div className="text-xs">
          나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다,
          에비브러햄 링컨
        </div>
        <Todo user={user} getTodoList={getTodoList} />
        <div className="mt-16 flex flex-col w-1/2">
          {toDolist
            ? toDolist.map((v, i) => {
                return (
                  <TodoCard
                    key={i}
                    Todo={v.todo}
                    index={v.id}
                    isDone={v.isDone}
                    userId={v.userId}
                    getTodoList={getTodoList}
                  />
                );
              })
            : "TodoList 없을 때"}
        </div>
      </div>
    </div>
  );
}

export default App;
