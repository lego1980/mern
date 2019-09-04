import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './PageForm.css'

export default class PageForm extends React.Component {
 
  state = {
    id :  '',
    title :  '',
    subtitle :  '',
    keywords : '',
    description :  '',
    content : '',
    likes: 0,
    images: [],
    createdAt : '',
    createdBy : '',
    updatedAt : '',
    updatedBy : ''
  }  
  
  updateHandler = () => {
    let obj = Object.assign(this.state);    
    // revisit
    obj.updatedBy = '';
    obj.updatedAt = new Date().getTime();
    if (obj.createdAt === '') {
      obj.createdBy = '';
      obj.createdAt = new Date().getTime();
    }
    this.props.updateHandler(obj);
  }

  deleteHandler = () => {
    let obj = Object.assign(this.state);
    this.props.deleteHandler(obj);
  }

  addHandler = () => {    
    let obj = Object.assign(this.state); 
    // revisit     
    obj.createdBy = '';
    obj.createdAt = new Date().getTime();
    obj.updatedBy = '';
    obj.updatedAt = new Date().getTime();  
    console.log("addHandler",obj);
    this.props.addHandler(obj);
  }

  resetHandler = () => {
    this.setState({
      id :  '',
      title :  '',
      subtitle : '',
      keywords : '',
      description : '',
      content : '',
      likes : 0,
      images : [],
      createdAt : '',
      createdBy : '',
      updatedAt : '',
      updatedBy : ''
    })
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addImage = () => {
    this.setState(state => {
      const images = [...state.images, ""];
      return {
        images
      }
    }, () => {
      console.log("addImage",this.state);
    });    
  }

  addImageHandler = (event,i) => {
    console.log('image',event.target.value,i);
    let val = event.target.value
    this.setState(state => {
      const images = state.images.map((image, j) => {        
        if (j === i) {
          return image = val
        } else {
          return image
        }
      });
      return {
        images
      }
    }, () => {
      console.log("addImageHandler",this.state);
    });    
  }

  removeImageHandler = (event,i) => {
    console.log("removeImageHandler",i);
    this.setState(state => {
      const images = state.images.splice(i,0);
      return {
        images
      }
    }, () => {
      console.log("removeImageHandler",this.state);
    });    
  }
    
  UNSAFE_componentWillReceiveProps(next) {
    if (next.selectedItem === '' || next.selectedItem === null) {
      this.resetHandler();
    } else {
      this.setState({
        id :  next.selectedItem._id,
        title :  next.selectedItem.title,
        subtitle :  next.selectedItem.subtitle,
        keywords : next.selectedItem.keywords,
        description : next.selectedItem.description,
        content : next.selectedItem.content,
        images: next.selectedItem.images,
        likes: next.selectedItem.likes,
        createdAt : next.selectedItem.createdAt,
        createdBy : next.selectedItem.createdBy,
        updatedAt : next.selectedItem.updatedAt,
        updatedBy : next.selectedItem.updatedBy
      })
    }
  }

  render() {  
    return (
      <Form className="page-form"> 
        {
          this.state.id !== ''
          ?
            <FormGroup>
              <Input type="text" name="title" id="title" readOnly value={this.state.id} />
            </FormGroup>
          :
            null
        }        
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="enter title" value={this.state.title} onChange={(event) => this.onChangeHandler(event)} />
        </FormGroup>
        <FormGroup>
          <Label for="subtitle">Subtitle</Label>
          <Input type="text" name="subtitle" id="subtitle" placeholder="enter subtitle" value={this.state.subtitle} onChange={(value) => this.onChangeHandler(value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="keywords">Keywords</Label>
          <Input type="text" name="keywords" id="keywords" placeholder="enter keywords" value={this.state.keywords} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" placeholder="enter description" value={this.state.description} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>       
        <FormGroup>
          <Label for="content">Content</Label>
          <Input type="textarea" name="content" id="content" placeholder="enter content" value={this.state.content} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>
        <FormGroup>
          <Label for="content">Likes</Label>
          <Input type="text" name="likes" id="likes" placeholder="enter content" value={this.state.likes} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>
        <FormGroup>
          <Label for="content">Images</Label>
          <Button onClick={(e) => this.addImage(e)}>+</Button>  
          {
            this.state.images.length !== 0
              ?                
                  this.state.images.map((image,i) => 
                    <div key={"image-wrapper-"+i}>
                      <Input key={"image-"+i} type="text" name={"image"} placeholder="enter image url" value={this.state.images[i]} onChange={(value) => this.addImageHandler(value,i)} />
                      <Button key={"image-remove-"+i} onClick={(e) => this.removeImageHandler(e,i)}>-</Button>
                    </div>  
                  )
              :
                null
          }          
        </FormGroup>
        <div className={"action-panel"}>
          {
            this.state.id !== '' && this.state.id !== null
            ?
              <>
                <Button onClick={(e) => this.updateHandler()}>Update</Button>
                <Button onClick={(e) => this.deleteHandler()}>Delete</Button>
              </>
            :
              <>
                <Button onClick={(e) => this.addHandler()}>Add</Button>  
                <Button onClick={(e) => this.resetHandler()}>Reset</Button> 
              </>         
          }
        </div>
      </Form>
    );
  }
}