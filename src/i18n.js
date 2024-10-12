import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "title": "DeFi Monitoring Interface",
          "contractAddress": "Enter the staking contract address",
          "userAddress": "Enter the user's Ethereum address",
          "searchWithoutUser": "Search without user address",
          "loading": "Loading...",
          "fetchData": "Fetch Data",
          "accountInfo": "Account Information",
          "balance": "Balance",
          "txCount": "Transaction Count",
          "stakingInfo": "Staking Information",
          "stakedAmount": "Staked Amount",
          "rewards": "Rewards",
          "notifications": "Notifications",
          "errorFetchingData": "Error fetching blockchain data",
          "errorSubscribingEvents": "Error subscribing to events. Check if the contract meets the requirements."
        }
      },
      pt: {
        translation: {
          "title": "Interface de Monitoramento DeFi",
          "contractAddress": "Digite o endereço do contrato de staking",
          "userAddress": "Digite o endereço Ethereum do usuário",
          "searchWithoutUser": "Buscar sem endereço de usuário",
          "loading": "Carregando...",
          "fetchData": "Buscar Dados",
          "accountInfo": "Informações da Conta",
          "balance": "Saldo",
          "txCount": "Número de Transações",
          "stakingInfo": "Informações de Staking",
          "stakedAmount": "Quantidade Staked",
          "rewards": "Recompensas",
          "notifications": "Notificações",
          "errorFetchingData": "Erro ao buscar dados da blockchain",
          "errorSubscribingEvents": "Erro ao subscrever aos eventos. Verifique se o contrato atende aos requisitos."
        }
      },
      es: {
        translation: {
          "title": "Interfaz de Monitoreo DeFi",
          "contractAddress": "Ingrese la dirección del contrato de staking",
          "userAddress": "Ingrese la dirección de Ethereum del usuario",
          "searchWithoutUser": "Buscar sin dirección de usuario",
          "loading": "Cargando...",
          "fetchData": "Buscar Datos",
          "accountInfo": "Información de la Cuenta",
          "balance": "Saldo",
          "txCount": "Número de Transacciones",
          "stakingInfo": "Información de Staking",
          "stakedAmount": "Cantidad Staked",
          "rewards": "Recompensas",
          "notifications": "Notificaciones",
          "errorFetchingData": "Error al buscar datos de blockchain",
          "errorSubscribingEvents": "Error al suscribirse a los eventos. Verifique si el contrato cumple con los requisitos."
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;