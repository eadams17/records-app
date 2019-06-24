import React from "react";
import { shallow } from "enzyme";
import RecordGrid from "./index";

describe("RecordGrid", () => {
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
        }
      ],
      2: [
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
      ],
      3: [
        {
          album_title: "Migas Brunch Tacos",
          year: 1991,
          condition: "good",
          artist: {
            name: "Earth Wind and Fire",
            id: 11
          },
          id: 12
        },
        {
          album_title: "Austin Bespoke Tilde",
          year: 1934,
          condition: "mint",
          artist: {
            name: "James Brown and the JBs",
            id: 13
          },
          id: 14
        }
      ]
    },
    updateRecords: jest.fn(),
    updatePage: jest.fn(() => Promise.resolve()),
    filteredRecords: null,
    pageCount: 3,
    currentPage: 1
  };
  const component = shallow(<RecordGrid {...mockProps} />);
  it("clicking arrows calls handlePageChange", () => {
    const spy = jest.spyOn(component.instance(), "handlePageChange");
    component.find("#rightArrow").simulate("click", "forward");
    component.find("#leftArrow").simulate("click", "forward");
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
