import { render } from "@testing-library/react";
import Credits from "./Credits";
import { creditsList } from "config/mockData";
import { fireEvent } from "@testing-library/react";

describe("Credits Component", () => {
  it("should render without exploding", () => {
    const wrapper = render(<Credits creditsList={creditsList} />);
    expect(wrapper.length).toEqual();
    expect(wrapper.getByText("Mariane Pearl")).toBeInTheDocument();
    expect(wrapper.getByText("A Mighty Heart")).toBeInTheDocument();
    expect(wrapper.getByText("Lara Croft")).toBeInTheDocument();
    expect(wrapper.getByText("Lara Croft: Tomb Raider")).toBeInTheDocument();
    expect(wrapper.getByText("Lara Croft2")).toBeInTheDocument();
    expect(
      wrapper.getByText("Lara Croft: Tomb Raider - The Cradle of Life")
    ).toBeInTheDocument();
    expect(wrapper.getByTestId("creditImage0")).toBeInTheDocument();
    expect(wrapper.getByTestId("creditImage1")).toBeInTheDocument();
    expect(wrapper.getByTestId("creditImage2")).toBeInTheDocument();
    expect(wrapper.getByTestId("creditImage0").src).toBe(
      "https://image.tmdb.org/t/p/w185/z5f7KPg8vqqYXtaF0w%E2%80%A6yDIg.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    expect(wrapper.getByTestId("creditImage1").src).toBe(
      "https://image.tmdb.org/t/p/w185/sJpl1EfHGZhbKtZ3fW%E2%80%A6M1tH.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    expect(wrapper.getByTestId("creditImage2").src).toBe(
      "https://image.tmdb.org/t/p/w185/vzWqkXbqs3EEMi3jgF%E2%80%A6FGlG.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    expect(wrapper.getByTestId("moreCardButton")).toBeInTheDocument();
    expect(wrapper.getByTestId("creditsCards")).toBeInTheDocument();
    expect(wrapper.getByTestId("creditsCards").children.length).toEqual(11);

      const button = wrapper.getByTestId("moreCardButton");
      fireEvent.click(button);
      expect(wrapper.getByTestId("creditsCards").children.length).toEqual(15);
  });
});
