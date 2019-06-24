import React, { PureComponent } from "react";
import styles from "./style.module.css";
import humanizeString from "humanize-string";
import {
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { renderIcons, getButtonStyle } from "../utils/helperFunctions.js";
import PropTypes from "prop-types";

class RecordInformation extends PureComponent {
  state = {
    dropdownOpen: false,
    condition: null
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  changeValue = e => {
    const condition = humanizeString(e.currentTarget.textContent);
    this.setState({ condition: condition });
    this.props.updateField(condition, "condition");
  };

  render() {
    const { dropdownOpen, condition } = this.state;
    const { record, insideModal, updateField, errors } = this.props;
    const formattedCondition = humanizeString(record.condition);
    const labelStyle = insideModal ? styles.modalLabel : styles.label;
    const conditionDropdown = condition ? condition : formattedCondition;
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-compact-disc" />
            <li className={labelStyle}>Album</li>
          </div>
          {!insideModal && (
            <li id={styles.album} className={styles.info}>
              {record.album_title}
            </li>
          )}
          {insideModal && (
            <div className={styles.inputContainer}>
              <Input
                defaultValue={record.album_title}
                className={styles.infoModal}
                onChange={e => updateField(e.target.value, "album")}
              />
              {errors && errors["album"] && (
                <p className={styles.error}>{errors["album"]}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-user-circle" />
            <li className={labelStyle}>Artist</li>
          </div>
          {!insideModal && (
            <li className={styles.info}>{record.artist.name}</li>
          )}
          {insideModal && (
            <div className={styles.inputContainer}>
              <Input
                defaultValue={record.artist.name}
                className={styles.infoModal}
                onChange={e => updateField(e.target.value, "artist")}
              />
              {errors && errors["artist"] && (
                <p className={styles.error}>{errors["artist"]}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="far fa-calendar-alt" />
            <li className={labelStyle}> Year</li>
          </div>
          {!insideModal && <li className={styles.info}>{record.year}</li>}
          {insideModal && (
            <div className={styles.inputContainer}>
              <Input
                defaultValue={record.year}
                className={styles.infoModal}
                onChange={value => updateField(value.target.value, "year")}
              />
              {errors && errors["year"] && (
                <p className={styles.error}>{errors["year"]}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-heartbeat" />
            <li className={labelStyle}>Condition</li>
          </div>
          <div
            id={insideModal ? styles.modalCondition : {}}
            className={styles.conditionContainer}
          >
            {!insideModal && (
              <li id={styles.condition} className={styles.info}>
                {formattedCondition}
              </li>
            )}
            {insideModal && (
              <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                  style={getButtonStyle(conditionDropdown)}
                  className={styles.button}
                  caret
                  size="sm"
                >
                  {condition ? condition : formattedCondition}
                </DropdownToggle>
                <DropdownMenu className={styles.menu}>
                  <DropdownItem onClick={this.changeValue} dropdownvalue="Mint">
                    Mint
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.changeValue}
                    dropdownvalue="Very Good"
                  >
                    Very Good
                  </DropdownItem>
                  <DropdownItem onClick={this.changeValue} dropdownvalue="Good">
                    Good
                  </DropdownItem>
                  <DropdownItem onClick={this.changeValue} dropdownvalue="Fair">
                    Fair
                  </DropdownItem>
                  <DropdownItem onClick={this.changeValue} dropdownvalue="Poor">
                    Poor
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            )}
            {!insideModal && (
              <div className={styles.conditionContainer}>
                {renderIcons(formattedCondition)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

RecordInformation.propTypes = {
  record: PropTypes.object.isRequired,
  updateField: PropTypes.func,
  insideModal: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default RecordInformation;
