
import { useEffect, useState } from 'react';
import './App.scss';
import { Message } from './components/Message';

function App() {
  const [messageList, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === 'HUMAN') {
      setMessages(messages => [...messages, { id: count, text: 'I\'m a bot', author: "Bot", date: getCurrentDate() }]);
      setCount(count + 1);
    }
  })

  const handleAddMessage = () => {
    setMessages(messages => [...messages, { id: count, text: value, author: "HUMAN", date: getCurrentDate() }]);
    setCount(count + 1);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddMessage();
    setValue("");
  }

  const getCurrentDate = () => {
    const day = new Date();
    let curr_date = day.getDate();
    curr_date = curr_date < 10 ? '0' + curr_date : curr_date;
    let curr_month = day.getMonth() + 1;
    curr_month = curr_month < 10 ? '0' + curr_month : curr_month;
    const curr_year = day.getFullYear();
    return `${curr_year}-${curr_month}-${curr_date} ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`
  }

  return (
    <div className="App">
      <div className="Chat">
        <div className="ChatHistory">
          <ul className="ChatMarker">
            {messageList.map((message) => <Message key={message.id} message={message} />)}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ChatMessage Clearfix">
            <textarea className="ChatMessageText" value={value} onChange={handleChange} placeholder="Type your message" rows="3"></textarea>
            <input className="ChatMessageBtn" type="submit" value="Отправить" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;