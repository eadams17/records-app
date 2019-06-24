import React from "react";
import { shallow } from "enzyme";
import RecordUpdate from "./index";
import { Modal } from "reactstrap";

describe("RecordUpdate", () => {
  const mockProps = {
    allRecords: {
      1: [
        {
          album_title: "Cardigan Letterpress Scenester",
          year: 1967,
          condition: "poor",
          artist: {
            name: "Sex Pistols",
            id: 0
          },
          id: 1
        },
        {
          album_title: "Banjo Pitchfork Flannel",
          year: 1984,
          condition: "mint",
          artist: {
            name: "The Who",
            id: 5
          },
          id: 6
        },
        {
          album_title: "Authentic Knausgaard Godard",
          year: 2014,
          condition: "mint",
          artist: {
            name: "Frank Zappa and the Mothers of Invention",
            id: 7
          },
          id: 8
        }
      ]
    },
    updateRecords: jest.fn(),
    record: {
      album_title: "Cardigan Letterpress Scenester",
      year: 1967,
      condition: "poor",
      artist: {
        name: "Sex Pistols",
        id: 0
      }
    },
    visible: true,
    toggle: jest.fn(),
    pageCount: 1
  };
  const component = shallow(<RecordUpdate {...mockProps} />);
  it("hitting a key calls handleKeyPress", () => {
    let e = { key: "A" };
    const spyHandleKeyPress = jest.spyOn(
      component.instance(),
      "handleKeyPress"
    );
    component
      .find(Modal)
      .props()
      .onKeyPress(e);
    expect(spyHandleKeyPress).toHaveBeenCalled();
  });
  it("updateField updates piece of state", () => {
    expect(component.state().album).toEqual("Cardigan Letterpress Scenester");
    component.instance().updateField("Dark Side of the Moon", "album");
    expect(component.state().album).toEqual("Dark Side of the Moon");
    expect(component.state().year).toEqual(1967);
    component.instance().updateField(1969, "year");
    expect(component.state().year).toEqual(1969);
  });
});
