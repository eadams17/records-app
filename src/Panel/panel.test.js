import React from "react";
import { shallow } from "enzyme";
import Panel from "./index";

describe("Panel", () => {
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
    toggleModal: jest.fn(),
    handleKeyPress: jest.fn(),
    imgURL: "www.lol.com"
  };
  const component = shallow(<Panel {...mockProps} />);
  it("onClick calls toggleModal", () => {
    component
      .first()
      .props()
      .onClick();
    expect(mockProps.toggleModal).toHaveBeenCalled();
  });
  it("onKeyPress calls handleKeyPress", () => {
    const e = { key: "Enter" };
    component
      .first()
      .props()
      .onKeyPress(e);
    expect(mockProps.handleKeyPress).toHaveBeenCalledWith(e);
  });
});
