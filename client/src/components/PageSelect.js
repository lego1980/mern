import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class PageSelect extends React.Component {
    onChangeHandler = (id) => {
        this.props.setSelection(id);
    }    
    render() {
        return (
        <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect" onChange={(event)=>this.onChangeHandler(event.target.value)}>
            <option key={'option-add'} value={"add"}>Add New</option>
            {
                this.props.data  !== null
                ? 
                this.props.data.pages.map((item) => (
                    <option key={'option-'+item._id} value={item._id}>{item.title}</option>
                    ))
                : 
                    null
            }
            </Input>
        </FormGroup>
        );
    }
}


