import { render } from "@testing-library/react";
import Casts from "./Casts";
import { castsList } from "config/mockData";
import { fireEvent } from "@testing-library/react";

describe("Casts Component", () => {
  it("should render without exploding", () => {
    const wrapper = render(<Casts castsList={castsList} />);
    expect(wrapper.length).toEqual();
    expect(wrapper.getByText("Tom Leezak")).toBeInTheDocument();
    expect(wrapper.getByText("Ashton Kutcher")).toBeInTheDocument();
    expect(wrapper.getByText("Brittany Murphy")).toBeInTheDocument();
    expect(wrapper.getByText("Peter Prentiss")).toBeInTheDocument();
    expect(wrapper.getByText("Christian Kane")).toBeInTheDocument();
    expect(wrapper.getByText("Sarah McNerney")).toBeInTheDocument();
    expect(wrapper.getByTestId("castImage0")).toBeInTheDocument();
    expect(wrapper.getByTestId("castImage1")).toBeInTheDocument();
    expect(wrapper.getByTestId("castImage2")).toBeInTheDocument();
    expect(wrapper.getByTestId("castImage1").src).toBe(
      "https://image.tmdb.org/t/p/w185/9vjgU9EcHXYyh6Vc4nmpoPVNqsQ.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    expect(wrapper.getByTestId("castImage0").src).toBe(
      "https://image.tmdb.org/t/p/w185/LvIpFJZDNjRKD5Nl9QAaRxYIiv.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    expect(wrapper.getByTestId("castImage2").src).toBe(
      "https://image.tmdb.org/t/p/w185/bHQDqGBW2yCEsHlNMkmJpQA9lDr.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    expect(wrapper.getByTestId("moreButton")).toBeInTheDocument();
    expect(wrapper.getByTestId("castsCards")).toBeInTheDocument();
    expect(wrapper.getByTestId("castsCards").children.length).toEqual(11);

    const button = wrapper.getByTestId("moreButton");
    fireEvent.click(button);
    expect(wrapper.getByTestId("castsCards").children.length).toEqual(14);
  });
});
