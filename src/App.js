import { Box, Button, Container, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getBalance, getTransactionCount } from './services/blockchain';
import { getStakingInfo } from './services/defi';
import { subscribeToEvents } from './services/notifications';

function App() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [txCount, setTxCount] = useState(null);
  const [stakingInfo, setStakingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const fetchBlockchainData = async () => {
    setLoading(true);
    try {
      const balance = await getBalance(address);
      const txCount = await getTransactionCount(address);
      const stakingInfo = await getStakingInfo(address);
      setBalance(balance);
      setTxCount(txCount);
      setStakingInfo(stakingInfo);
    } catch (error) {
      console.error('Erro ao buscar dados da blockchain:', error);
      alert('Erro ao buscar dados da blockchain');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (address) {
      subscribeToEvents(address, (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      });
    }
  }, [address]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          DeFi Monitoring Interface
        </Typography>
        <TextField
          fullWidth
          label="Digite o endereço Ethereum"
          variant="outlined"
          value={address}
          onChange={handleAddressChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchBlockchainData}
          disabled={loading}
          fullWidth
        >
          {loading ? 'Carregando...' : 'Buscar Dados'}
        </Button>

        {balance !== null && (
          <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h6">Informações da Conta</Typography>
            <Typography>Saldo: {balance} ETH</Typography>
            <Typography>Número de Transações: {txCount}</Typography>
          </Paper>
        )}

        {stakingInfo !== null && (
          <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h6">Informações de Staking</Typography>
            <Typography>Staked Amount: {stakingInfo.stakedAmount} ETH</Typography>
            <Typography>Rewards: {stakingInfo.rewards} ETH</Typography>
          </Paper>
        )}

        {notifications.length > 0 && (
          <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h6">Notificações</Typography>
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