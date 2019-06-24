import React from "react";
import { mount } from "enzyme";
import Navbar from "./index";

describe("Navbar", () => {
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
    updateRecords: jest.fn()
  };
  const component = mount(<Navbar {...mockProps} />);
  it("toggle changes dropdownOpen piece of state", () => {
    expect(component.state().dropdownOpen).toEqual(false);
    component.instance().toggle();
    expect(component.state().dropdownOpen).toEqual(true);
  });
  it("change value updates searchType piece of state", () => {
    const e = {
      currentTarget: {
        textContent: "album"
      }
    };
    expect(component.state().searchType).toEqual("Search By");
    component.instance().changeValue(e);
    expect(component.state().searchType).toEqual("album");
  });
  it("handleSearchQuery sets searchQuery piece of state and calls filterRecordEntries with searchString", () => {
    const e = {
      currentTarget: {
        value: "the who"
      }
    };
    expect(component.state().searchQuery).toEqual("");
    component.instance().handleSearchQuery(e);
    expect(component.state().searchQuery).toEqual("the who");
  });
  it("filterRecord entries calls updateRecords", () => {
    component.instance().filterRecordEntries("the who");
    expect(component.props().updateRecords).toHaveBeenCalled();
  });
});
