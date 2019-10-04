import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import './PageSelect.css'

export default class PageSelect extends React.Component {
    onChangeHandler = (id) => {
        this.props.setSelection(id);
    }    
    render() {
        let {id} = '';
        if (this.props.selectedItem !== null) {
            id = this.props.selectedItem._id;
        } else {
            id = '';
        }
        return (
        <FormGroup className={'page-select'}>
            <Label for="pageSelect">Select an item : </Label>
            <Input type="select" name="select" id="pageSelect" onChange={(event)=>this.onChangeHandler(event.target.value)}>
            <option key={'option-add'} value={""}>Add New</option>
            {
                this.props.data  !== null
                ? 
                this.props.data.items.map((item) => (
                    <option selected={((id === item._id) ? "selected" : null)} key={'option-'+item._id} value={item._id}>{item.title || "untitled"}</option>
                    ))
                : 
                    null
            }
            </Input>
        </FormGroup>
        );
    }
}


