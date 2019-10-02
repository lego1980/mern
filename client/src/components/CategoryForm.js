import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import slugify from '../utils/slugify';
import './CategoryForm.css';

export default class CategoryForm extends React.Component {
 
  state = {
    id :  '',
    title :  '',
    subtitle :  '',
    keywords : '',
    description :  '',
    content : '',
    likes: 0,
    images: [],
    active: false,
    category: '',
    subCategory: '',
    tags: '',
    url: '',
    createdAt : '',
    createdBy : '',
    updatedAt : '',
    updatedBy : '',
    modalDelete: false,
    modalUpdate: false,
    modalFormUpdate: false,
    formUpdate: false,
    validation: false,
    errors: {
      title: 'Title is required',
      content: 'Content is required'
    }
  }  
  
  toggleModalFormUpdate = () => {
    this.setState(prevState => ({
      modalFormUpdate: !prevState.modalFormUpdate
    }));
  }

  closeFormHandler = (bool) => {
    if (this.state.formUpdate && !bool) {
      this.toggleModalFormUpdate();
    } else {
      if (this.state.modalFormUpdate) {
        this.toggleModalFormUpdate();
      }
      this.props.showFormHandler(false);
    }    
  }

  toggleModalUpdate = () => {
    this.setState(prevState => ({
      modalUpdate: !prevState.modalUpdate
    }));
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
    this.toggleModalUpdate();
  }

  toggleModalDelete = () => {
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete
    }));
  }
  
  deleteHandler = () => {
    let obj = Object.assign(this.state);
    this.props.deleteHandler(obj);
    this.toggleModalDelete();
  }

  addHandler = () => {    
    let obj = Object.assign(this.state); 
    // revisit     
    obj.createdBy = '';
    obj.createdAt = new Date().getTime();
    obj.updatedBy = '';
    obj.updatedAt = new Date().getTime();  
    this.props.addHandler(obj);
  }

  resetHandler = () => {
    this.setState({
      id :  '',
      dataId :  '',
      title :  '',
      subtitle : '',
      keywords : '',
      description : '',
      content : '',
      likes : 0,
      images : [],      
      active : false,
      category: '',
      subCategory: '',
      tags: '',
      url: '',
      createdAt : '',
      createdBy : '',
      updatedAt : '',
      updatedBy : '',
      modalDelete: false,
      modalUpdate: false,
      modalFormUpdate: false,
      formUpdate: false,
      validation: false,
      errors: {
        title: 'Title is required',
        content: 'Content is required'
      }
    })
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      formUpdate: true
    });  
    
    // start validation
    let errors = this.state.errors;
    switch (name) {
      case 'title': 
        errors.title = value.length === 0 ? 'Title is required' : '';
        break;
      case 'content': 
        errors.content = value.length === 0 ? 'Content is required' : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value}, () => {
      if (this.state.errors.title.length === 0 && this.state.errors.content.length === 0) {
        this.setState({
          validation : true
        })
      } else {
        this.setState({
          validation : false
        })
      }
    })
    // end validation

    if (name === "title") {
      this.setState({
        url: slugify(value)
      });  
    }
  }

  addImage = () => {
    this.setState(state => {
      const images = [...state.images, {imageUrl:'',imageAlt:'',imageTitle:'',imageDescription:''}];
      return {
        images
      }
    }, () => {
      console.log("addImage",this.state);
    });    
  }

  addImageHandler = (event,i) => {
    let val = event.target.value;
    let name = event.target.name;
    this.setState(state => {
      const images = state.images.map((image, j) => {        
        if (j === i) {
          image[name] = val;  
          return image;
        } else {
          return image;
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
    this.setState(state => {
      state.images.splice(i,1);
      const images = state.images;
      return {
        images
      }
    }, () => {
      console.log("removeImageHandler",this.state);
    });    
  }
    
  UNSAFE_componentWillReceiveProps(next) {
    if (next.selectedCategory === '' || next.selectedCategory === null) {
      this.resetHandler();
    } else {
      this.setState({
        id :  next.selectedCategory._id,
        dataId: next.selectedCategory.dataId || '',
        title :  next.selectedCategory.title,
        subtitle :  next.selectedCategory.subtitle,
        keywords : next.selectedCategory.keywords,
        description : next.selectedCategory.description,
        content : next.selectedCategory.content,
        images: next.selectedCategory.images,
        likes : next.selectedCategory.likes,
        active: next.selectedCategory.active,
        category: next.selectedCategory.category || '',
        subCategory: next.selectedCategory.subCategory || '',
        tags: next.selectedCategory.tags || '',
        url: next.selectedCategory.url || '',
        createdAt : next.selectedCategory.createdAt,
        createdBy : next.selectedCategory.createdBy,
        updatedAt : next.selectedCategory.updatedAt,
        updatedBy : next.selectedCategory.updatedBy,        
        modalDelete: false,
        modalUpdate: false,
        modalFormUpdate: false,
        formUpdate: false,
        validation: ((next.selectedCategory.title.length !== 0 && next.selectedCategory.content.length !== 0) ? true : false),
        errors: {
          title: ((next.selectedCategory.title.length !== 0) ? '' : 'Title is required'),
          content: ((next.selectedCategory.content.length !== 0) ? '' : 'Content is required')
        }
      })
    }
  }

  render() {
    return (
      <>
        <Form className="category-form"> 
          {
            this.state.id !== ''
            ?
              <FormGroup>
                <Input type="text" name="id" id="id" readOnly value={this.state.id} />
              </FormGroup>
            :
              null
          } 
          <FormGroup className={'category-select'}>
            <Label for="active">Active?</Label>
            <Input type="select" name="active" id="active" value={this.state.active} onChange={(event)=>this.onChangeHandler(event)}>
              <option key={'option-active-false'} value={false}>False</option>
              <option key={'option-active-true'} value={true}>True</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="url">URL</Label>
            <Input type="text" name="url" id="url" readOnly placeholder="enter a url" value={this.state.url} />
          </FormGroup>    
          <FormGroup>
            <Label for="title">Title { this.state.errors.title !== '' ? this.state.errors.title : null }</Label>
            <Input type="text" name="title" id="title" placeholder="enter a title" value={this.state.title} onChange={(event) => this.onChangeHandler(event)} />
          </FormGroup>
          <FormGroup>
            <Label for="subtitle">Subtitle</Label>
            <Input type="text" name="subtitle" id="subtitle" placeholder="enter a subtitle" value={this.state.subtitle} onChange={(value) => this.onChangeHandler(value)}/>
          </FormGroup>
          <FormGroup>
            <Label for="keywords">Keywords</Label>
            <Input type="text" name="keywords" id="keywords" placeholder="enter keywords" value={this.state.keywords} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category Name</Label>
            <Input type="text" name="category" id="category" placeholder="enter a category" value={this.state.category} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>
          <FormGroup>
            <Label for="subCategory">Sub Category</Label>
            <Input type="text" name="subCategory" id="subCategory" placeholder="enter a subCategory" value={this.state.subCategory} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>
          <FormGroup>
            <Label for="tags">Tags</Label>
            <Input type="text" name="tags" id="tags" placeholder="enter tags" value={this.state.tags} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description" placeholder="enter a description" value={this.state.description} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>       
          <FormGroup>
            <Label for="content">Content { this.state.errors.content !== '' ? this.state.errors.content : null }</Label>
            <Input type="textarea" name="content" id="content" placeholder="enter a content" value={this.state.content} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>
          <FormGroup>
            <Label for="content">Likes</Label>
            <Input type="text" name="likes" id="likes" placeholder="enter a content" value={this.state.likes} onChange={(value) => this.onChangeHandler(value)} />
          </FormGroup>
          <FormGroup>
            {
              this.state.images.length !== 0
                ?                
                    this.state.images.map((image,i) => 
                      <div className={"image-wrapper"} key={"image-wrapper-"+i}>
                        <h3>Image {(i+1)}</h3>
                        <Input key={"image-title"+i} type="text" name={"imageTitle"} placeholder="enter image title" value={this.state.images[i].imageTitle} onChange={(value) => this.addImageHandler(value,i)} />
                        <Input key={"image-description"+i} type="text" name={"imageDescription"} placeholder="enter image description" value={this.state.images[i].imageDescription} onChange={(value) => this.addImageHandler(value,i)} />
                        <Input key={"image-alt"+i} type="text" name={"imageAlt"} placeholder="enter image alt" value={this.state.images[i].imageAlt} onChange={(value) => this.addImageHandler(value,i)} />
                        <Input key={"image-"+i} type="text" name={"imageUrl"} placeholder="enter image url" value={this.state.images[i].imageUrl} onChange={(value) => this.addImageHandler(value,i)} />
                        {
                          this.state.images[i].imageUrl && this.state.images[i].imageUrl !== ''
                          ?
                            <div className={"image-viewer"}>
                              <img src={this.state.images[i].imageUrl} alt={this.state.images[i].imageAlt} title={this.state.images[i].imageTitle} />
                            </div>
                          :
                            null
                        }                      
                        <Button color="danger" key={"image-remove-"+i} onClick={(e) => this.removeImageHandler(e,i)}>remove</Button>
                      </div>  
                    )
                :
                  null
            }
            <Button color="primary" className={"add-image-btn"} onClick={(e) => this.addImage(e)}>Add image</Button>           
          </FormGroup>
          <div className={"action-panel"}>
            {
              this.state.id !== '' && this.state.id !== null
              ?
                <>
                  <Button color="primary" disabled={ this.state.validation === false ? true : null } onClick={(e) => this.toggleModalUpdate()}>Update</Button>
                  <Button color="danger" onClick={(e) => this.toggleModalDelete()}>Delete</Button>
                </>
              :
                <>
                  <Button disabled={ this.state.validation === false ? true : null } color="primary" onClick={(e) => this.addHandler()}>Add</Button>  
                  <Button onClick={(e) => this.resetHandler()}>Reset</Button> 
                </>         
            }            
            <Button className={"close-btn"} onClick={(e) => this.closeFormHandler(false)}>Close &rarr;</Button>
          </div>
        </Form>
        <Modal isOpen={this.state.modalUpdate} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Update page "{this.state.title}"?</ModalHeader>
          <ModalBody>
            Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.updateHandler()}>Save</Button>
            <Button color="secondary" onClick={() => this.toggleModalUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalDelete} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete page "{this.state.title}"?</ModalHeader>
          <ModalBody>
            Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.deleteHandler()}>Delete</Button>
            <Button color="secondary" onClick={() => this.toggleModalDelete()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalFormUpdate} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Close Form</ModalHeader>
          <ModalBody>
            There are pending changes, do you still wish to close the form?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.closeFormHandler(true)}>Close Form</Button>
            <Button color="secondary" onClick={() => this.toggleModalFormUpdate()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}