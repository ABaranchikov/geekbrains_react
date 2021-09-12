
import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { Message } from './components/Message';
import { ChatElement } from './components/ChatElement';

function App() {
  const chatList = [
    { id: "1", name: "Louis Litt", img: "http://emilcarlsson.se/assets/louislitt.png" },
    { id: "2", name: "Harvey Specter", img: "http://emilcarlsson.se/assets/harveyspecter.png" },
    { id: "3", name: "Rachel Zane", img: "http://emilcarlsson.se/assets/rachelzane.png" },
    { id: "4", name: "Donna Paulsen", img: "http://emilcarlsson.se/assets/donnapaulsen.png" },
    { id: "5", name: "Jessica Pearson", img: "http://emilcarlsson.se/assets/jessicapearson.png" },
  ];
  const [chat, setChatList] = useState(chatList);
  const [messageList, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === 'HUMAN') {
      setMessages(messages => [...messages, { id: count, text: 'I\'m a bot', author: "Bot", date: getCurrentDate() }]);
      setCount(count + 1);
    }
    inputRef.current.focus();
  }, [messageList]);

  const handleAddMessage = () => {
    setMessages(messages => [...messages, { id: count, text: value, author: "HUMAN", date: getCurrentDate() }]);
    setCount(count + 1);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      handleAddMessage();
    }
    setValue("");
    inputRef.current.focus();
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
    <div className="App m-0 d-flex justify-content-center align-items-center">
      <Container fluid="md" className="Container p-0 m-0">
        <Row className="h-100 m-0 p-0">
          <Col md={4} className="SidePanel m-0 p-0">
            <ListGroup className="ChatList">
              {chat.map((item) => <ChatElement key={item.id} chat={item} />)}
            </ListGroup>
          </Col>
          <Col md={8} className="Content m-0 p-0">
            <Card className="m-0 p-0">
              <Card.Header className="ContentProfile d-flex flex-row justify-content-start align-items-center">
                <img className="ContactProfileImg" src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                <p className="ContactProfileTxt m-0 p-0">Harvey Specter</p>
              </Card.Header>
              <Card.Body className="Messages">
                <div className = "Scrollable"> 
                  {messageList.map((message) => <Message key={message.id} message={message} />)}
                </div>
              </Card.Body>
              <Card.Footer>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">

                    <Form.Control as="textarea" placeholder="Write your message..." value={value} onChange={handleChange} ref={inputRef} />

                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Отправить
                  </Button>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

      </Container>
      {/*



      <div className="row justify-content-center h-100">
        <div className="col-md-4 col-xl-3">
        </div>
        <div className="Content">
          <div className="">
            <ul className="">
              {messageList.map((message) => <Message key={message.id} message={message} />)}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <textarea className="" value={value} onChange={handleChange} placeholder="Type your message" rows="3" ref={inputRef}></textarea>
              <input className="" type="submit" value="Отправить" />
            </div>
          </form>
        </div>

      </div>
*/}

    </div>
  );
}

export default App;