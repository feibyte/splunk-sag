import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const noRippleTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disables ripple globally
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      }
    }
  },
});

const renderApp = () => {
  /** Wrapp with this them to disable the ripple, or will get annoying console errro saying：
   *  An update to ForwardRef(TouchRipple) inside a test was not wrapped in act(...).  */
  return render(<ThemeProvider theme={noRippleTheme}><App /></ThemeProvider>);
}

describe('App', () => {
  it('should display no options given memory size is too low', async () => {
    renderApp();
    await userEvent.click(screen.getByLabelText('CPU'));

    const option = await screen.findByText('Power');
    await userEvent.click(option);

    await userEvent.type(screen.getByLabelText('Memory Size'), '1024');

    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await screen.findByText('No options');
  });

  it('should display High Density Server option when ARM is CPU with large memory and GPU accelerator', async () => {
    renderApp();
    await userEvent.click(screen.getByLabelText('CPU'));

    const option = await screen.findByText('ARM');
    await userEvent.click(option);

    await userEvent.type(screen.getByLabelText('Memory Size'), '524288');

    await userEvent.click(screen.getByLabelText('GPU Accelerator Card'));

    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await screen.findByText('High Density Server');
  });

  it('should display 3 options when selecting Power CPU and large memoryr', async () => {
    renderApp();
    await userEvent.click(screen.getByLabelText('CPU'));

    const option = await screen.findByText('Power');
    await userEvent.click(option);

    await userEvent.type(screen.getByLabelText('Memory Size'), '524288');

    await userEvent.click(screen.getByLabelText('GPU Accelerator Card'));

    await userEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await screen.findByText('MainFrame');
    await screen.findByText('4U Rack Server');
    await screen.findByText('TowerServer');
  });
});
