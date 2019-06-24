import React from "react";
import { shallow } from "enzyme";
import Record from "./index";
import RecordUpdate from "../RecordUpdate";

describe("Record", () => {
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
    record: {
      album_title: "Cardigan Letterpress Scenester",
      year: 1967,
      condition: "poor",
      artist: {
        name: "Sex Pistols",
        id: 0
      },
      id: 1
    },
    updateRecords: jest.fn(),
    pageCount: 1,
    currentPage: 1
  };
  const component = shallow(<Record {...mockProps} />);
  it("toggleModal updates visible piece of state and opens RecordUpdate modal", () => {
    expect(component.state().visible).toEqual(false);
    expect(component.find(RecordUpdate).length).toEqual(0);
    component.instance().toggleModal();
    expect(component.state().visible).toEqual(true);
    expect(component.find(RecordUpdate).length).toEqual(1);
  });
  it("modal is toggled if enter is pressed", () => {
    let e = { key: "A" };
    component.setState({ visible: false });
    component.instance().handleKeyPress(e);
    expect(component.state().visible).toEqual(false);
    expect(component.find(RecordUpdate).length).toEqual(0);
    e.key = "Enter";
    component.instance().handleKeyPress(e);
    expect(component.state().visible).toEqual(true);
    expect(component.find(RecordUpdate).length).toEqual(1);
  });
});
