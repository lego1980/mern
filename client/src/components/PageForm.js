import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './PageForm.css'

export default class PageForm extends React.Component {
 
  state = {
    id :  'add',
    title :  '',
    subtitle :  '',
    keywords : '',
    description :  '',
    content : ''
  }  
  
  updateHandler = () => {
    this.props.updateHandler();
  }

  deleteHandler = () => {
    this.props.deleteHandler();
  }

  addHandler = () => {
    this.props.addHandler();
  }

  resetHandler = () => {
    this.setState({
      id :  'add',
      title :  '',
      subtitle : '',
      keywords : '',
      description : '',
      content : ''
    })
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  componentWillReceiveProps(next) {
    if (next.selectedItem === 'add' || next.selectedItem === null) {
      this.resetHandler();
    } else {
      this.setState({
        id :  next.selectedItem._id,
        title :  next.selectedItem.title,
        subtitle :  next.selectedItem.subtitle,
        keywords : next.selectedItem.keywords,
        description : next.selectedItem.description,
        content : next.selectedItem.content
      })
    }
  }

  render() {  
    return (
      <Form> 
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
          <Input type="text" name="title" id="title" placeholder="with a placeholder" value={this.state.title} onChange={(event) => this.onChangeHandler(event)} />
        </FormGroup>
        <FormGroup>
          <Label for="subtitle">Subtitle</Label>
          <Input type="text" name="subtitle" id="subtitle" placeholder="with a placeholder" value={this.state.subtitle} onChange={(value) => this.onChangeHandler(value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="keywords">Keywords</Label>
          <Input type="text" name="keywords" id="keywords" placeholder="with a placeholder" value={this.state.keywords} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" value={this.state.description} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>       
        <FormGroup>
          <Label for="content">Content</Label>
          <Input type="textarea" name="content" id="content" value={this.state.content} onChange={(value) => this.onChangeHandler(value)} />
        </FormGroup>  
        {
          this.state.id !== '' && this.state.id !== 'add'
          ?
            <>
              <Button>Update</Button>
              <Button>Delete</Button>
            </>
          :
            <>
              <Button>Add</Button>  
              <Button onClick={(e) => this.resetHandler()}>Reset</Button> 
            </>         
        }
      </Form>
    );
  }
}