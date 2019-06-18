import React, { PureComponent } from "react";
import styles from "./style.module.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class NavBar extends PureComponent {
  state = { searchType: "album", dropdownOpen: false };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  changeValue = e => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };
  render() {
    const { searchType } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.logo}>DISCOgraphy</div>
        <div>
          <input className={styles.searchBar} placeholder="type here..." />
        </div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{searchType}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.changeValue} dropDownValue="Artist">
              Artist
            </DropdownItem>
            <DropdownItem onClick={this.changeValue} dropDownValue="Year">
              Year
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default NavBar;
