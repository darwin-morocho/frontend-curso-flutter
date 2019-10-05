import React from 'react';
import io from 'socket.io-client';
//import axios from 'axios';
import '../css/main.scss';

const MSG_TYPE = {
  text: 'text',
  image: 'image',
};

class Main extends React.Component {
  state = {
    connectedUsers: {},
    messages: [],
    inputText: '',
  };

  componentDidMount() {
    const token = localStorage.getItem('sessionKey');
    if (!token) window.location = 'login';
    this.socket = io(process.env.REACT_APP_API_HOST, {
      query: {
        token,
      },
    });

    this.socket.on('connected', data => {
      console.log('connected', data);
      this.id = data.id;
      this.setState({ connectedUsers: data.connectedUsers });
    });

    this.socket.on('joined', data => {
      console.log('joined', data);
      const { connectedUsers } = this.state;
      connectedUsers[data.id] = data.user;
      this.setState({ connectedUsers });
    });

    this.socket.on('new-message', data => {
      console.log('new-message', data);
      const { messages } = this.state;
      const newMessage = {
        id: data.from.id,
        username: data.from.username,
        createdAt: Date.now(),
        message: data.message,
        type: data.type,
      };
      this.setState({ inputText: '', messages: messages.concat(newMessage) });
    });
  }

  onSend = () => {
    const { inputText, messages } = this.state;
    if (inputText) {
      this.socket.emit('send', inputText);
      const newMessage = {
        id: this.id,
        createdAt: Date.now(),
        message: inputText,
        type: MSG_TYPE.text,
      };
      this.setState({ inputText: '', messages: messages.concat(newMessage) });
    }
  };

  render() {
    const { connectedUsers, inputText, messages } = this.state;

    return (
      <div id="chat" className="d-flex container">
        <div id="connected">
          <p>Usuarios Conectados</p>
          {Object.keys(connectedUsers).map(key => (
            <div key={key}>@{connectedUsers[key].username}</div>
          ))}
        </div>
        <div
          className="ma-left-30 flex-1 d-flex flex-column"
          style={{ height: '100vh' }}
        >
          <div id="messages" className="flex-1 ma-ver-10">
            {messages.map(item => (
              <div
                key={`${item.id}${item.createdAt}`}
                className={`d-flex ${
                  item.id === this.id
                    ? 'jc-end pa-left-100'
                    : 'jc-start pa-right-100'
                }`}
              >
                <div
                  className={`message fw-300 ${
                    item.id === this.id ? 'me' : ''
                  }`}
                >
                  {item.username && (
                    <small className="d-block f-10 ma-bottom-5">
                      <span>@{item.username}</span>
                    </small>
                  )}
                  {item.message}
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex ma-bottom-10 ai-center">
            <input
              className="form-control"
              type="text"
              placeholder="Ingrese su mensaje"
              value={inputText}
              onChange={e => this.setState({ inputText: e.target.value })}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  this.onSend();
                }
              }}
            />
            <button
              type="button"
              className=" ma-left-10 btn btn-primary"
              onClick={this.onSend}
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
