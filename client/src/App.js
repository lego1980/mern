// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  // initialize our state
  constructor(props){
    super(props);
    this.state = {
      http: "http://",
      https: "https://",
      apiVersion: "1.0",
      api: "localhost:3001/api/",
      apiUrl: null,
      _id: 0,
      title: null,
      subtitle: null,
      description: null,
      keywords: null,
      content: null,
      likes: 0,
      images: [],
      data: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    }
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentWillMount() {
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion });
  }
  
  componentDidMount() {
    
    this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    // if (this.state.intervalIsSet) {
    //   clearInterval(this.state.intervalIsSet);
    //   this.setState({ intervalIsSet: null });
    // }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    let that = this;
    axios.get(this.state.apiUrl+'/pages')
      .then((data) => {
        console.log(data)
        that.setState({ data: data.data.response })
      })
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    axios.post(this.state.apiUrl+'/pages', {
      title: "This is new page added",
      subtitle: "this is the subtitle",
      description: "description is added",
      keywords : "keywords is added",
      content: "content is added",
      // likes: 0,
      images: [],
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    let objIdToDelete = idTodelete;
    axios.delete(this.state.apiUrl+'/pages/'+objIdToDelete);
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = idToUpdate;
    axios.post(this.state.apiUrl+'/pages/'+objIdToUpdate, {
      title: "UPDATE this is new title",
      subtitle: "UPDATE this is the subtitle",
      description: "UPDATE description is added",
      keywords : "UPDATE keywords is added",
      content: "UPDATE content is added",
      likes: 0,
      images: []
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    console.log("data",data)
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ title: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.title)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
        <button
            onClick={() =>
              this.getDataFromDb()
            }
          >
            LOAD DATA
          </button>
          <hr />
          <div>
            <ul>
              {
                data === null
                ? 'NO DB ENTRIES YET'
                : data.pages.map((dat) => (
                    <li style={{ padding: '10px' }} key={"pages-"+dat._id}>
                      <span style={{ color: 'gray' }}>id:</span>{dat._id}<br />
                      <span style={{ color: 'gray' }}>title:</span>{dat.title}<br />
                      <span style={{ color: 'gray' }}>subtitle:</span>{dat.subtitle}<br />
                      <span style={{ color: 'gray' }}>description:</span>{dat.description}<br />
                      <span style={{ color: 'gray' }}>keywords:</span>{dat.keywords}<br />
                      <span style={{ color: 'gray' }}>content:</span>{dat.content}<br />
                      <span style={{ color: 'gray' }}>likes:</span>{dat.likes}<br />
                      
                      {
                        dat.images.length !== 0
                        ?
                          // <span style={{ color: 'gray' }}>No. of Images {dat.images.length} </span>
                          dat.images.map((image, i) => (
                            <div key={"image-"+i} >
                              <hr />
                              <span key={"image-title-"+i} style={{ color: 'gray' }}>image title {i}: </span> {image.title} <br />
                              <span key={"image-alt-"+i} style={{ color: 'gray' }}>image alt {i}: </span> {image.alt} <br />
                              <span key={"image-src-"+i} style={{ color: 'gray' }}>image src {i}: </span> {image.src} <br />
                            </div>
                          ))
                        :
                          <hr/>
                      }
                    </li>
                  ))
              }
            </ul>
          </div>
      </div>
    );
  }
}

export default App;