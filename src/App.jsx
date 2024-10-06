// src/App.js

import React, { useState } from 'react';
import {
  useAddress,
  useMetamask,
  useDisconnect,
  useSDK,
} from '@thirdweb-dev/react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Paper,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from '@mui/material';

function App() {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();
  const sdk = useSDK();

  const [erc20Address, setErc20Address] = useState('');
  const [erc721Address, setErc721Address] = useState('');

  // State variables for ERC20 inputs
  const [erc20Name, setErc20Name] = useState('');
  const [erc20Symbol, setErc20Symbol] = useState('');

  // State variables for ERC721 inputs
  const [erc721Name, setErc721Name] = useState('');
  const [erc721Symbol, setErc721Symbol] = useState('');

  // Loading states
  const [loadingERC20, setLoadingERC20] = useState(false);
  const [loadingERC721, setLoadingERC721] = useState(false);

  // Snackbar states
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const deployERC20 = async () => {
    if (!erc20Name || !erc20Symbol) {
      setSnackbarMessage('Please enter a name and symbol for the ERC20 token.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    try {
      setLoadingERC20(true);
      const contractAddress = await sdk.deployer.deployBuiltInContract(
        'token',
        {
          name: erc20Name,
          symbol: erc20Symbol,
          primary_sale_recipient: address,
          primary_fee_recipient: address,
          platform_fee_basis_points: 100, // 1%
        },
        '5.0.2', // Specify the version
        {
          gasLimit: 5000000, // Set a higher gas limit
        }
      );
      setErc20Address(contractAddress);
      setSnackbarMessage(`ERC20 Contract Deployed at: ${contractAddress}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to deploy ERC20 contract');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoadingERC20(false);
    }
  };

  const deployERC721 = async () => {
    if (!erc721Name || !erc721Symbol) {
      setSnackbarMessage(
        'Please enter a name and symbol for the ERC721 NFT collection.'
      );
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    try {
      setLoadingERC721(true);
      const contractAddress = await sdk.deployer.deployBuiltInContract(
        'nft-collection',
        {
          name: erc721Name,
          symbol: erc721Symbol,
          external_link: 'https://ninjapay.in',
          image:
            'https://file.notion.so/f/f/87ea3c95-99bf-4229-adac-65d62c260eae/0e5b8296-c4c0-4613-8f4c-b4aa6fb4cb3f/L2.svg?id=35f3b023-e479-4df2-873e-df95ed9aefd6&table=block&spaceId=87ea3c95-99bf-4229-adac-65d62c260eae&expirationTimestamp=1720180800000&signature=ifgF5uHETmgcPqwsGqinqAOfZbmoqqo-XmLBSUU8hxQ&downloadName=L2.svg',
          description: 'This is Nin Token',
          primary_sale_recipient: address,
          primary_fee_recipient: address,
          platform_fee_basis_points: 100, // 1%
        },
        '5.0.2', // Specify the version
        {
          gasLimit: 5000000, // Set a higher gas limit
        }
      );
      setErc721Address(contractAddress);
      setSnackbarMessage(`ERC721 Contract Deployed at: ${contractAddress}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to deploy ERC721 contract');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoadingERC721(false);
    }
  };

  // Create a custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#21728D', // Ninja Brand color
      },
      secondary: {
        main: '#88a1ac', // Cement Secondary color
      },
    },
    typography: {
      h5: {
        fontWeight: 600,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Ninja Deploy Console
            </Typography>
            {address ? (
              <Button color="inherit" onClick={disconnect}>
                Disconnect Wallet
              </Button>
            ) : (
              <Button color="inherit" onClick={connectWithMetamask}>
                Connect Wallet
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
          {address ? (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Connected Wallet Address: {address}
              </Typography>

              <Grid container spacing={4}>
                {/* ERC20 Deployment */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} style={{ padding: '1rem' }}>
                    <Typography variant="h5" gutterBottom>
                      Deploy ERC20 Contract
                    </Typography>
                    <TextField
                      label="Token Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={erc20Name}
                      onChange={(e) => setErc20Name(e.target.value)}
                    />
                    <TextField
                      label="Token Symbol"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={erc20Symbol}
                      onChange={(e) => setErc20Symbol(e.target.value)}
                    />
                    <Box textAlign="center" marginTop="1rem">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={deployERC20}
                        disabled={loadingERC20}
                        startIcon={
                          loadingERC20 && (
                            <CircularProgress size={20} color="inherit" />
                          )
                        }
                      >
                        {loadingERC20 ? 'Deploying...' : 'Deploy ERC20 Contract'}
                      </Button>
                    </Box>
                    {erc20Address && (
                      <Typography variant="body2" style={{ marginTop: '1rem' }}>
                        ERC20 Contract Address: {erc20Address}
                      </Typography>
                    )}
                  </Paper>
                </Grid>

                {/* ERC721 Deployment */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} style={{ padding: '1rem' }}>
                    <Typography variant="h5" gutterBottom>
                      Deploy ERC721 Contract
                    </Typography>
                    <TextField
                      label="NFT Collection Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={erc721Name}
                      onChange={(e) => setErc721Name(e.target.value)}
                    />
                    <TextField
                      label="NFT Collection Symbol"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={erc721Symbol}
                      onChange={(e) => setErc721Symbol(e.target.value)}
                    />
                    <Box textAlign="center" marginTop="1rem">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={deployERC721}
                        disabled={loadingERC721}
                        startIcon={
                          loadingERC721 && (
                            <CircularProgress size={20} color="inherit" />
                          )
                        }
                      >
                        {loadingERC721
                          ? 'Deploying...'
                          : 'Deploy ERC721 Contract'}
                      </Button>
                    </Box>
                    {erc721Address && (
                      <Typography variant="body2" style={{ marginTop: '1rem' }}>
                        ERC721 Contract Address: {erc721Address}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </>
          ) : (
            <Box textAlign="center" marginTop="2rem">
              <Typography variant="h6" gutterBottom>
                Please connect your MetaMask wallet to proceed.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={connectWithMetamask}
              >
                Connect MetaMask Wallet
              </Button>
            </Box>
          )}
        </Container>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
