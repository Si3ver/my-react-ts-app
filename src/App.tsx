import { useCallback, useEffect, useState } from 'react';
import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import './App.scss';

interface todoItemProps {
  id: number;
  content: string;
  completed: boolean;
}

function App() {

  const [isInputShow, setInputShow] = useState(false)
  const [todoList, setTodoList] = useState<todoItemProps[]>([])

  /** 本地存储: 取 */
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, [])

  /** 本地存储: 存 */
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])

  /** 增加一项todo */
  const addItem = useCallback((value: string) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false,
    }
    setTodoList(todoList => [...todoList, dataItem])
    setInputShow(false)
  }, [])

  return (
    <div className="App">
      <MyHeader openInput={()=>{
        setInputShow(!isInputShow)
      }} />
      <AddInput
        isInputShow={ isInputShow }
        addItem={addItem}
      />
      {!todoList || todoList.length === 0 ? (
        'nodata'
      ) : (
        <ul className="todo-list">
          {todoList.map((item, index) => {
            return (
              <TodoItem
                dataItem={item}
                key={index}
                removeItem={() => {}}
                openCheckModal={() => {}}
                completeItem={() => {}}
                openEditModal={() => {}}
              />
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
