import { useState, useEffect, useCallback } from 'react';
import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import NoDataTip from './components/NoDataTip';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';
import './App.scss';

interface todoItemProps {
  id: number;
  content: string;
  completed: boolean;
}

function App() {

  const [ isShowInput, setIsShowInput ] = useState(false),
        [ isShowCheckModal, setIsShowCheckModal ] = useState(false),
        [ isShowEditModal, setIsShowEditModal ] = useState(false),
        [ todoList, setTodoList ] = useState<todoItemProps[]>([]),
        [ currentData, setCurrentData ] = useState<todoItemProps | {}>({})

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
    setIsShowInput(false)
  }, [])

  /** 删除一项todo */
  const removeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id));
  }, [])

  /** 完成一项todo */
  const completeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    }));
  }, [])

  /** 查看一项 */
  const openCheckModal = useCallback(
    (id) => {
      setCurrentData(() => todoList.filter((item) => item.id === id)[0]);
      setIsShowCheckModal(true);
    },
    [todoList]
  )

  /** 编辑一项 */
  const openEditModal = useCallback(
    (id) => {
      setCurrentData(() => todoList.filter((item) => item.id === id)[0]);
      setIsShowEditModal(true);
    },
    [todoList]
  )

  /** 完成编辑 */
  const submitEdit = useCallback(
    (newData, id) => {
      setTodoList((todoList) =>
        todoList.map((item) => {
          if (item.id === id) {
            item = newData;
          }
          return item;
        })
      );
      setIsShowEditModal(false);
    },
    []
  )

  return (
    <div className="App">
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        data={currentData}
        closeModal={() => setIsShowCheckModal(false)}
      />
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      />
      <MyHeader openInput={() => setIsShowInput(!isShowInput)} />
      <AddInput isShow={isShowInput} addItem={(value: any) => addItem(value)} />
      {!todoList || todoList.length === 0 ? (
        <NoDataTip />
      ) : (
        <ul className="todo-list">
          {todoList.map((item, index) => {
            return (
              // <div>{index} --- {JSON.stringify(item)}</div>
              <TodoItem
                dataItem={item}
                key={index}
                removeItem={removeItem}
                openCheckModal={openCheckModal}
                completeItem={completeItem}
                openEditModal={openEditModal}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
