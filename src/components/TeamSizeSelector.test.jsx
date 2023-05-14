import React from "react";
import { shallow } from "enzyme";
import { TeamSizeSelector, min, max, maxTeams } from "./TeamSizeSelector";

describe("TeamSizeSelector component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TeamSizeSelector />);
  });

  it("renders three TextField components", () => {
    expect(wrapper.find("TextField")).toHaveLength(3);
  });

  it("updates minSize state when the Minimum team size TextField changes", () => {
    const event = { target: { value: "5" } };
    wrapper.find('[label="Minimum team size"]').simulate("change", event);
    expect(min).toEqual(5);
    expect(wrapper.find('[label="Minimum team size"]').props().value).toEqual(5);
  });

  it("updates maxSize state when the Maximum team size TextField changes", () => {
    const event = { target: { value: "8" } };
    wrapper.find('[label="Maximum team size"]').simulate("change", event);
    expect(max).toEqual(8);
    expect(wrapper.find('[label="Maximum team size"]').props().value).toEqual(8);
  });

  it("updates numTeams state when the Max number of teams TextField changes", () => {
    const event = { target: { value: "20" } };
    wrapper.find('[label="Max number of teams"]').simulate("change", event);
    expect(maxTeams).toEqual(20);
    expect(wrapper.find('[label="Max number of teams"]').props().value).toEqual(20);
  });
});
