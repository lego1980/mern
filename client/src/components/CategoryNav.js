import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Badge, Button } from 'reactstrap';
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
                      <Badge className="count-badge" color="primary">{this.props.data.count} Cateories Found</Badge>
                    :
                      <Badge className="count-badge" color="primary">0 Category Found</Badge>
                }
            </NavbarBrand>
            <Button className={"close-btn"} onClick={(e) => this.openFormHandler(true)}>&larr; Add Category</Button>
        </Navbar>
      </div>
    );
  }
}