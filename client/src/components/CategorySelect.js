import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import './CategorySelect.css'

export default class CategorySelect extends React.Component {
    onChangeHandler = (id) => {
        this.props.setSelection(id);
    }    
    render() {
        let {id} = '';
        if (this.props.selectedCategory !== null) {
            id = this.props.selectedCategory._id;
        } else {
            id = '';
        }
        return (
        <FormGroup className={'category-select'}>
            <Label for="categorySelect">Select a category : </Label>
            <Input type="select" name="select" id="categorySelect" onChange={(event)=>this.onChangeHandler(event.target.value)}>
            <option key={'option-add'} value={""}>Add New</option>
            {
                this.props.data  !== null
                ? 
                this.props.data.items.map((item) => (
                    <option selected={((id === item._id) ? "selected" : null)} key={'option-'+item._id} value={item._id}>{item.title}</option>
                    ))
                : 
                    null
            }
            </Input>
        </FormGroup>
        );
    }
}


