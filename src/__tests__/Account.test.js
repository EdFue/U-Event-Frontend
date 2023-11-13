import { render, screen } from '@testing-library/react';
import Account from './Account';

test('renders Account component', () => {
  render(<Account />);
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
