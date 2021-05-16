import { useState } from 'react';
import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import './App.css';

function App() {

  const [isInputShow, setInputShow] = useState(false)

  return (
    <div className="App">
      <MyHeader openInput={()=>{
        setInputShow(!isInputShow)
      }} />
      <AddInput
        isInputShow={ isInputShow }
      />
    </div>
  );
}

export default App;
