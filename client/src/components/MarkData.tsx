import MarkedDone from "./MarkedDone";

interface smaltodo {
  title: string;
  description: string;
  done: boolean;
  id: number;
}

interface DataType {
  Todo: smaltodo[];
}

export function TodoList(props: DataType) {
  return (
    <div className="flex gap-6 flex-wrap p-6 ">
      {props.Todo.map((todo: smaltodo, index) => {
        return (
          <MarkedDone
            todo={todo}
            index={index}
          />
        );
      })}
    </div>
  );
}
