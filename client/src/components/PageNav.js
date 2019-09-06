import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Badge, Button } from 'reactstrap';
import './PageNav.css';

export default class PageNav extends React.Component {
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
      <div className={"page-nav"}>
        <Navbar color="faded" light>
            <NavbarBrand>
                Pages 
                {
                    this.props.data !== null
                    ?
                        <Badge className="page-badge" color="primary">{this.props.data.count}</Badge>
                    :
                        null
                }
            </NavbarBrand>
            <Button className={"close-btn"} onClick={(e) => this.openFormHandler(true)}>Add Page &larr;</Button>
          {/* <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse> */}
        </Navbar>
      </div>
    );
  }
}