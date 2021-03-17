import { render } from "@testing-library/react";
import Show from "./Show";
import { castsList, showDetails } from "config/mockData";

describe("Show Component", () => {
  it("should render without exploding", () => {
    const wrapper = render(<Show castsList={castsList} {...showDetails} />);
    expect(wrapper.length).toEqual();
    expect(wrapper.getByText(2003)).toBeInTheDocument();
    expect(
      wrapper.getByText("Action, Adventure, Fantasy, Thriller - 117mins")
    ).toBeInTheDocument();
    expect(wrapper.getByText("Angelina Jolie")).toBeInTheDocument();
    expect(
      wrapper.getByText("Lara Croft: Tomb Raider - The Cradle of Life")
    ).toBeInTheDocument();
    expect(wrapper.getByTestId("showImage")).toBeInTheDocument();
    expect(wrapper.getByTestId("showImage").src).toBe(
      "https://image.tmdb.org/t/p/w500/vzWqkXbqs3EEMi3jgFpiRPgFGlG.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );

    expect(
      wrapper.getByText(
        "Lara Croft ventures to an underwater temple in search of the mythological Pandora's Box but, after securing it, it is promptly stolen by the villainous leader of a Chinese crime syndicate. Lara must recover the box before the syndicate's evil mastermind uses it to construct a weapon of catastrophic capabilities."
      )
    ).toBeInTheDocument();
  });
});
