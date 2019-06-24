import React from "react";
import { shallow } from "enzyme";
import RecordInformation from "./index";
import { Input, ButtonDropdown, DropdownItem } from "reactstrap";

describe("RecordInformation", () => {
  const mockProps = {
    record: {
      album_title: "Cardigan Letterpress Scenester",
      year: 1967,
      condition: "poor",
      artist: {
        name: "Sex Pistols",
        id: 0
      }
    },
    insideModal: false,
    updateField: jest.fn(),
    errors: []
  };
  const component = shallow(<RecordInformation {...mockProps} />);
  it("render condition star icons if isModal is false", () => {
    const secondAlbum = {
      album_title: "Cardigan Letterpress Scenester",
      year: 1967,
      condition: "mint",
      artist: {
        name: "Sex Pistols",
        id: 0
      }
    };
    const starArray = i =>
      component.first().get(i).props.children[3].props.children[1].props
        .children[2].props.children;
    expect(starArray(0).length).toEqual(1);
    component.setProps({ record: secondAlbum });
    expect(starArray(0).length).toEqual(5);
  });
  it("renders Input and Button Dropdown if insideModal is true", () => {
    component.setProps({ insideModal: true });
    expect(component.find(Input).length).toEqual(3);
    expect(component.find(ButtonDropdown).length).toEqual(1);
  });
  it("Input onChange calls updateField prop", () => {
    const e = { target: { value: "Dark Side of the Moon" } };
    component
      .find(Input)
      .first()
      .props()
      .onChange(e);
    expect(mockProps.updateField).toHaveBeenCalledWith(
      "Dark Side of the Moon",
      "album"
    );
  });
  it("toggle changes dropdownOpen piece of state", () => {
    expect(component.state().dropdownOpen).toEqual(false);
    component.instance().toggle();
    expect(component.state().dropdownOpen).toEqual(true);
  });
  it("clicking DropdownItem updates condition piece of state", () => {
    const e = { currentTarget: { textContent: "Good" } };
    component
      .find(DropdownItem)
      .last()
      .props()
      .onClick(e);
    expect(component.state().condition).toEqual("Good");
  });
});
