import React from "react";
import { shallow } from "enzyme";
import App from "./index";
describe("App", () => {
  const mockRecords = [
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
      album_title: "Sriracha Vinegar Disrupt",
      year: 1964,
      condition: "poor",
      artist: {
        name: "Derek and the Dominos",
        id: 1
      },
      id: 2
    },
    {
      album_title: "Heirloom Twee Literally",
      year: 1923,
      condition: "very_good",
      artist: {
        name: "The Animals",
        id: 2
      },
      id: 3
    }
  ];
  it("updateRecordData calls paginateRecordData and updates filteredRecordData and pageCount pieces of state", () => {
    const component = shallow(<App />);
    const spy = jest.spyOn(component.instance(), "paginateRecordData");
    component.setState({
      allRecordData: { 1: mockRecords },
      currentPage: 1,
      pageCount: 1
    });
    component.instance().updateRecordData(mockRecords);
    expect(spy).toHaveBeenCalledWith(mockRecords);
    expect(component.state().filteredRecordData).toEqual({ 1: mockRecords });
    expect(component.state().pageCount).toEqual(1);
  });
});
