import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './PageForm.css'

export default class PageForm extends React.Component {
  render() {
    console.log(this.props.selectedItem);
    let {id} = '';
    let {title} = '';
    let {subtitle} = '';
    let {keywords} = '';
    let {description} = '';
    let {content} = '';

    if (this.props.selectedItem !== null) {
      id = this.props.selectedItem._id || '';
      title = this.props.selectedItem.title || '';
      subtitle = this.props.selectedItem.subtitle || '';
      keywords = this.props.selectedItem.keywords || '';
      description = this.props.selectedItem.description || '';
      content = this.props.selectedItem.content || '';
    } else {
      title = '';
      subtitle = '';
      keywords = '';
      description = '';
      content = '';
    }
    
    return (
      <Form> 
        {/* <Input type="hidden" name="title" id="title" value={id} onChange={(value) => this.onChange(value)} /> */}
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="with a placeholder" value={title} onChange={(value) => this.onChange(value)} />
        </FormGroup>
        <FormGroup>
          <Label for="subtitle">Subtitle</Label>
          <Input type="text" name="subtitle" id="subtitle" placeholder="with a placeholder" value={subtitle} onChange={(value) => this.onChange(value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="keywords">Keywords</Label>
          <Input type="text" name="keywords" id="keywords" placeholder="with a placeholder" value={keywords} onChange={(value) => this.onChange(value)} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" value={description} onChange={(value) => this.onChange(value)} />
        </FormGroup>       
        <FormGroup>
          <Label for="content">Content</Label>
          <Input type="textarea" name="content" id="content" value={content} onChange={(value) => this.onChange(value)} />
        </FormGroup>       
        <Button>Add</Button>
        <Button>Update</Button>
        <Button>Delete</Button>
      </Form>
    );
  }
}