import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Badge, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CategoryNav.css';

export default class CategoryNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  openFormHandler = (bool) => {
    this.props.setSelection('');
    this.props.toggleShowForm(bool);
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className={"category-nav"}>
        <Navbar color="faded" light>
            <NavbarBrand>
                CMS  
                {
                  this.props.data !== null
                    ?
                      <Badge className="count-badge" color="primary">{this.props.data.count} Cateor{this.props.data.count <= 1 ? "y" : "ies"} Found</Badge>
                    :
                      <Badge className="count-badge" color="primary">0 Category Found</Badge>
                }
            </NavbarBrand>
            <Link className={"btn btn-primary"} to={"/item"}>&larr; Go To Item Page</Link>
            <Button className={"close-btn"} onClick={(e) => this.openFormHandler(true)}>&larr; Add Category</Button>
        </Navbar>
      </div>
    );
  }
}