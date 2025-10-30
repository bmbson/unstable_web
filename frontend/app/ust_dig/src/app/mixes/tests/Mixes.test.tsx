import { render, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals'
import Mixes from '../page';

it('should render mix_card', () => {
    render(<Mixes />); // ARRANGE
    const myElem = screen.getByText('dub techno'); // ACT
    expect(myElem).toBeInTheDocument(); // Assert
});

// quick test for testing functionality
describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });
});
