import { Box, Button, Checkbox, Container, FormControlLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import { getBalance, getTransactionCount } from './services/blockchain';
import { getStakingInfo, subscribeToEvents } from './services/defi';

function App() {
  const { t, i18n } = useTranslation();
  const [userAddress, setUserAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [txCount, setTxCount] = useState(null);
  const [stakingInfo, setStakingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [searchWithoutUser, setSearchWithoutUser] = useState(false);

  const handleUserAddressChange = (e) => {
    setUserAddress(e.target.value);
  };

  const handleContractAddressChange = (e) => {
    setContractAddress(e.target.value);
  };

  const handleSearchWithoutUserChange = (e) => {
    setSearchWithoutUser(e.target.checked);
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const fetchBlockchainData = async () => {
    if (!ethers.utils.isAddress(contractAddress)) {
      toast.error(t('errorFetchingData'));
      return;
    }

    if (!searchWithoutUser && !ethers.utils.isAddress(userAddress)) {
      toast.error(t('errorFetchingData'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (!searchWithoutUser) {
        const balance = await getBalance(userAddress);
        const txCount = await getTransactionCount(userAddress);
        setBalance(balance);
        setTxCount(txCount);
      } else {
        const balance = await getBalance(contractAddress);
        const txCount = await getTransactionCount(contractAddress);
        setBalance(balance);
        setTxCount(txCount);
      }
      const stakingInfo = await getStakingInfo(contractAddress, searchWithoutUser ? null : userAddress);
      setStakingInfo(stakingInfo);
      toast.success(t('fetchData'));
    } catch (error) {
      console.error('Erro ao buscar dados da blockchain:', error);
      toast.error(t('errorFetchingData'));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (contractAddress && ethers.utils.isAddress(contractAddress)) {
      try {
        subscribeToEvents(contractAddress, userAddress, (notification) => {
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
          toast.info(notification);
        });
      } catch (error) {
        console.error('Erro ao subscrever aos eventos:', error);
        toast.error(t('errorSubscribingEvents'));
      }
    }
  }, [contractAddress, userAddress]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="pt">Português</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
        <TextField
          fullWidth
          label={t('contractAddress')}
          variant="outlined"
          value={contractAddress}
          onChange={handleContractAddressChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={searchWithoutUser}
              onChange={handleSearchWithoutUserChange}
              color="primary"
            />
          }
          label={t('searchWithoutUser')}
        />
        {!searchWithoutUser && (
          <TextField
            fullWidth
            label={t('userAddress')}
            variant="outlined"
            value={userAddress}
            onChange={handleUserAddressChange}
            margin="normal"
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={fetchBlockchainData}
          disabled={loading}
          fullWidth
        >
          {loading ? t('loading') : t('fetchData')}
        </Button>

        <ToastContainer />

        {balance !== null && (
          <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h6">{t('accountInfo')}</Typography>
            <Typography>{t('balance')}: {balance} ETH</Typography>
            <Typography>{t('txCount')}: {txCount}</Typography>
          </Paper>
        )}

        {stakingInfo !== null && (
          <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h6">{t('stakingInfo')}</Typography>
            <Typography>{t('stakedAmount')}: {stakingInfo.stakedAmount} ETH</Typography>
            <Typography>{t('rewards')}: {stakingInfo.rewards} ETH</Typography>
          </Paper>
        )}

        {notifications.length > 0 && (
          <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h6">{t('notifications')}</Typography>
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index}>
                  <ListItemText primary={notification} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;