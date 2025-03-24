import { useState } from 'react';
import './App.css';
import { ServerForm } from './components/ServerForm';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { CPUType, ServerType } from './types/serverTypes';
import { generateServerOptions } from './utils/serverUtils';


function App() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [serverOptions, setServerOptions] = useState<ServerType[]>([]);

  const onSubmit = (data: { cpu: CPUType, memorySize: number, hasGPUAccelerator: boolean }) => {
    setHasSubmitted(true);
    const options = generateServerOptions(data.cpu, data.memorySize, data.hasGPUAccelerator);
    setServerOptions(options);
  };
  return (
    <div className="App">
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Server Composer
        </Typography>
        <ServerForm onSubmit={onSubmit} className='ServerForm' />
        <hr />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Server Model Options
        </Typography>
        {
          hasSubmitted && (
            serverOptions.length === 0 ? <div>No options</div> : (
              <ul>
                {
                  serverOptions.map((option) => (
                    <li key={option}>{option}</li>
                  ))
                }
              </ul>
            )
          )
        }

      </Container>
    </div>
  );
}

export default App;
