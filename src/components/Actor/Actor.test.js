import { render } from "@testing-library/react";
import Actor from "./Actor";
import { creditsList, actorDetails } from "config/mockData";
import { fireEvent } from "@testing-library/react";

describe("Actor Component", () => {
  it("should render without exploding", () => {
    const wrapper = render(
      <Actor creditsList={creditsList} {...actorDetails} />
    );
    expect(wrapper.length).toEqual();
    expect(wrapper.getByText("Mariane Pearl")).toBeInTheDocument();
    expect(wrapper.getByText("A Mighty Heart")).toBeInTheDocument();
    expect(wrapper.getByText("Angelina Jolie")).toBeInTheDocument();
    expect(wrapper.getByTestId("actorImage")).toBeInTheDocument();
    expect(wrapper.getByTestId("actorImage").src).toBe(
      "https://image.tmdb.org/t/p/w500/uLdam4e9CagaM8zqGls9c6MDbWo.jpg?api_key=b22cff5332e87104ff8d9402706266fb"
    );
    const button = wrapper.getByTestId("actorDetails");
    fireEvent.click(button);
    expect(
      wrapper.getByText(
        "Angelina Jolie is an American actress. She has received an Academy Award, two Screen Actors Guild Awards, and three Golden Globe Awards. Jolie has promoted humanitarian causes throughout the world, and is noted for her work with refugees as a Goodwill Ambassador for the United Nations High Commissioner for Refugees (UNHCR). She has been cited as one of the world's most beautiful women and her off-screen life is widely reported.↵↵Though she made her screen debut as a child alongside her father Jon Voight"
      )
    ).toBeInTheDocument();
  });
});
