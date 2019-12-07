import React from 'react';
import io from 'socket.io-client';
//import axios from 'axios';
import '../css/main.scss';
import firebase from '../firebase';
import { getFileExtension } from '../utils/utils';
import { async } from 'q';

const MSG_TYPE = {
  text: 'text',
  image: 'image',
};

class Main extends React.Component {
  state = {
    connectedUsers: {},
    messages: [],
    inputText: '',
    isUploadingFile: false,
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
        type: "text",
      };
      this.setState({ inputText: '', messages: messages.concat(newMessage) });
      this.scrollToBottom();
    });

    this.socket.on('new-file', data => {
      const { messages } = this.state;
      const newMessage = {
        id: data.from.id,
        username: data.from.username,
        createdAt: Date.now(),
        message: data.file.url,
        type: data.file.type,
      };
      this.setState({ inputText: '', messages: messages.concat(newMessage) });
      this.scrollToBottom();
    });
  }

  scrollToBottom = () => {
    setTimeout(() => {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

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
      this.scrollToBottom();
    }
  };

  sendFile = (url, type = MSG_TYPE.image) => {
    const { messages } = this.state;
    this.socket.emit('send-file', { type, url });
    const newMessage = {
      id: this.id,
      createdAt: Date.now(),
      message: url,
      type: MSG_TYPE.image,
    };
    this.setState({ messages: messages.concat(newMessage) });
    this.scrollToBottom();
  };

  onPickImage = e => {
    const { isUploadingFile } = this.state;
    if (isUploadingFile) {
      return;
    }
    const file = e.target.files[0];
    this.setState({ fileName: file.name, fileSize: file.size });
    const ext = getFileExtension(file.name);

    // Create a root reference
    const storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var imageRef = storageRef.child(`${Date.now()}.${ext}`);
    const uploadTask = imageRef.put(file);
    this.setState({ isUploadingFile: true });
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {},
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        this.setState({ isUploadingFile: false });
        this.sendFile(downloadURL, MSG_TYPE.image);
      }
    );
  };

  render() {
    const { connectedUsers, inputText, messages, isUploadingFile } = this.state;

    return (
      <div id="chat" className="d-flex container">
        <div id="connected">
          <p>Usuarios Conectados</p>
          {Object.keys(connectedUsers).map(key => (
            <div key={key}>@{connectedUsers[key].username}</div>
          ))}
        </div>
        <div
          className="ma-left-30 flex-1 d-flex flex-column relative"
          style={{ height: '100vh' }}
        >
          <div id="messages" className="ma-ver-10">
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
                  {item.type === MSG_TYPE.text && <span> {item.message}</span>}
                  {item.type === MSG_TYPE.image && (
                    <img src={item.message} style={{ maxWidth: 200 }} />
                  )}
                </div>
              </div>
            ))}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
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

            <label className="ma-left-10 btn-pick-image">
              <input
                type="file"
                className="d-none"
                accept="image/*"
                onChange={this.onPickImage}
              />
              <i className="material-icons">image</i>
            </label>

            <button
              type="button"
              className=" ma-left-10 btn btn-primary"
              onClick={this.onSend}
            >
              ENVIAR
            </button>
          </div>

          {isUploadingFile && <div id="uploading">Subiendo archivo ...</div>}
        </div>
      </div>
    );
  }
}

export default Main;
