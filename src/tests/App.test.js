import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import FormCustom from '../components/FormCustom/FormCustom';
import { MemoryRouter } from 'react-router-dom';

delete window.matchMedia;
window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders form data', async () => {
  const fakeData = {
    id: '2660dd24-e2db-42c1-8093-284b1df2664c',
    type: 'surveys',
    attributes: {
      title: 'Film feedback form',
      description:
        '<p>Thank you for participating in the film festival!</p><p>Please fill out this short survey so we can record your feedback.</p>',
      questions: [
        {
          questionId: 'film',
          questionType: 'text',
          label: 'What film did you watch?',
          required: true,
          attributes: null,
        },
        {
          questionId: 'review',
          questionType: 'range',
          label: 'How would you rate the film? (1 - Very bad, 5 - Very good)',
          required: true,
          attributes: {
            min: 1,
            max: 5,
          },
        },
      ],
    },
  };

  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  render(
    <MemoryRouter>
      <FormCustom data={fakeData} />
    </MemoryRouter>,
    container
  );

  expect(screen.getByText('What film did you watch?')).toBeInTheDocument();
  expect(
    screen.getByText(
      'How would you rate the film? (1 - Very bad, 5 - Very good)'
    )
  ).toBeInTheDocument();

  global.fetch.mockRestore();
});
