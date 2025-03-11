import {fireEvent, render, screen} from "@testing-library/react";
import Upload from "../views/Upload";

test('test upload button', () => {
  render(<Upload />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Uploading...')).toBeDefined();
});

test('renders h2 headline', () => {
  render(<Upload />);
  const header = screen.getByRole('heading', {
      level: 2,
    })
  expect(header).toBeDefined();
});
