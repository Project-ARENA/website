import { render, fireEvent} from "@testing-library/react";
import { getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import TeamInputBox from "./TeamInputBox";
import InputBoxForInfo from "./input-box-for-info";

describe("TeamInputBox component", () => {
    it('renders without crashing', () => {
        render(<TeamInputBox />);
      });
    
    it('renders the correct title and label', () => {
      const { getByText } = render(<TeamInputBox title="My Title" label="My Label" />);
      expect(getByText('My Title')).toBeInTheDocument();
      expect(getByText('My Label')).toBeInTheDocument();
    });

    it('renders the correct title and label', () => {
        const { getByText } = render(<TeamInputBox title="My Title" label="My Label" />);
        expect(getByText('My Title')).toBeInTheDocument();
        expect(getByText('My Label')).toBeInTheDocument();
    });


    // it('disables the button when disabled prop is true', () => {
    //   const { getByText } = render(<TeamInputBox disabled={true} />);
    //   const button = getByText('Submit');
    //   expect(button).toBeDisabled();
    // });
    

    // it('calls onClick function when button is clicked', () => {
    //   const onClick = jest.fn();
    //   const { getByTestId } = render(<TeamInputBox onClick={onClick} />);
    //   const button = getByTestId('team-input-box-button');
    //   fireEvent.click(button);
    //   expect(onClick).toHaveBeenCalled();
    // });

    // it('passes the placeholder prop to the input box', () => {
    //   const { getByPlaceholderText } = render(<TeamInputBox placeholder="Test Placeholder" />);
    //   const input = getByPlaceholderText('Test Placeholder');
    //   expect(input).toBeInTheDocument();
    // });
});
