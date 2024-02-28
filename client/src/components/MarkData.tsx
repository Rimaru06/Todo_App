
import MarkedDone from "./MarkedDone";

interface smaltodo {
  title: string;
  description: string;
  done: boolean;
  id: number;
}

interface DataType {
  allTodos: smaltodo[];
  setAllTodos: Function;
}

export function TodoList(props: DataType) {
  return (
    <div className="flex gap-6 flex-wrap p-6 ">
      {props.allTodos.map((todo: smaltodo, index) => {
        return (
          <MarkedDone
            setAllTodos={props.setAllTodos}
            allTodos={props.allTodos}
            key={todo.id}
            todo={todo}
            index={index}
          />
        );
      })}
    </div>
  );
}
