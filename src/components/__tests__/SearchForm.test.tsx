import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import SearchForm from "../SearchForm"

const mockFunc = jest.fn();

describe('SearchFrom', () => {

    it("renders", () => {
        const { asFragment } = render(<SearchForm callback={mockFunc} />);

        expect(asFragment).toMatchSnapshot();
    });

    it("calls the callback with correct coctail name parameters", () => {
        render(<SearchForm callback={mockFunc} />);

        const findBtn = screen.getByRole('button', { name: /find/i });
        const nameInput = screen.getByTestId('coctailname');

        userEvent.type(nameInput, 'martini');
        fireEvent.click(findBtn);

        expect(mockFunc).toHaveBeenCalled();
        expect(mockFunc.mock.calls[0][0]).toBe('martini');
        expect(mockFunc.mock.calls[0][1]).toBe(true);

    });

    it('calls the callback with correct coctail ingredient parameters', () => {
        render(<SearchForm callback={mockFunc} />);

        const findBtn = screen.getByRole('button', { name: /find/i });
        const ingredient = screen.getByTestId('coctailingredient');

        userEvent.type(ingredient, 'vermouth');
        fireEvent.click(findBtn);

        expect(mockFunc).toHaveBeenCalled();
        expect(mockFunc.mock.calls[0][0]).toBe('vermouth');
        expect(mockFunc.mock.calls[0][1]).toBe(false);
    });

    it('will not call the callback without input values', () => {
        render(<SearchForm callback={mockFunc} />);

        const findBtn = screen.getByRole('button', { name: /find/i });

        fireEvent.click(findBtn);

        expect(mockFunc).not.toHaveBeenCalled();
    });

    it('will not call callback with both fields filled', () => {
        render(<SearchForm callback={mockFunc} />);

        const findBtn = screen.getByRole('button', { name: /find/i });
        const ingredient = screen.getByTestId('coctailingredient');
        const nameInput = screen.getByTestId('coctailname');

        userEvent.type(ingredient, 'vermouth');
        userEvent.type(nameInput, 'martini');
        fireEvent.click(findBtn);

        expect(mockFunc).not.toHaveBeenCalled();
    })
})