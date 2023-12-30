import { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Alert,
  Button,
  TextField,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // State hook for storing the list of cryptocurrencies fetched from the API
  const [cryptos, setCryptos] = useState([]);

  // State hook for storing the currently selected cryptocurrency
  const [selectedCrypto, setSelectedCrypto] = useState("");

  // State hook for storing the currently selected fiat currency (default is "USD")
  const [selectedFiat, setSelectedFiat] = useState("USD");

  // State hook for storing the amount entered by the user
  const [amount, setAmount] = useState("");

  // State hook for storing the converted amount received from the conversion API
  const [convertedAmount, setConvertedAmount] = useState("");

  // State hook for storing the currency code of the converted amount
  const [currencyCode, setCurrencyCode] = useState("");

  // State hook to manage the loading state, such as during API calls
  const [loading, setLoading] = useState(true);

  // State hook for storing any error messages related to cryptocurrency data fetching
  const [cryptoError, setCryptoError] = useState("");

  // Constant array of fiat currencies supported for conversion
  const fiatCurrencies = ["USD", "EUR", "INR", "GBP", "JPY"];

  // Base URL for the API - consider using environment variables
  const URL = "http://localhost:3000/api";

  // Function to format the currency in a more readable way
  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  // Function to fetch cryptocurrencies from the backend
  useEffect(() => {
    fetchCryptos();
  }, []);

  // Fetch cryptocurrencies and handle any errors
  const fetchCryptos = async () => {
    try {
      const response = await axios.get(`${URL}/cryptocurrencies`);
      if (response.data && response.data.length > 0) {
        setCryptos(response.data);
        setSelectedCrypto(response.data[0].id);
      } else {
        setCryptoError("No cryptocurrencies available.");
      }
    } catch (error) {
      console.error(error);
      setCryptoError("Failed to load cryptocurrencies.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle currency conversion
  const handleConvert = async () => {
    if (!selectedCrypto || !amount || isNaN(amount) || amount < 1) {
      toast.error(
        "Please select a cryptocurrency and enter a valid amount (minimum 1)"
      );
      return;
    }

    try {
      const response = await axios.post(`${URL}/convert`, {
        source: selectedCrypto,
        amount: amount,
        target: selectedFiat,
      });
      setConvertedAmount(response.data.result.toFixed(2));
      setCurrencyCode(response.data.currency.toUpperCase());
      toast.success(`Conversion successful`);
    } catch (error) {
      console.error("Conversion error:", error.response?.data || error);
      toast.error("Conversion failed!");
    }
  };

  // Main render method
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Crypto Converter</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <ToastContainer />
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}>
            <CircularProgress />
          </div>
        ) : (
          <Paper
            elevation={3}
            style={{ padding: "2rem", borderRadius: "15px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cryptoError && <Alert severity="error">{cryptoError}</Alert>}
              <TextField
                select
                label="Cryptocurrency"
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                fullWidth
                variant="outlined">
                {cryptos.map((crypto) => (
                  <MenuItem key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Fiat Currency"
                value={selectedFiat}
                onChange={(e) => setSelectedFiat(e.target.value)}
                fullWidth
                variant="outlined">
                {fiatCurrencies.map((fiat) => (
                  <MenuItem key={fiat} value={fiat}>
                    {fiat}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Coin"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleConvert}
                fullWidth>
                Conversion Result:
              </Button>
              {convertedAmount && (
                <Typography variant="h4" color="secondary">
                  {formatCurrency(convertedAmount, currencyCode)}
                </Typography>
              )}
            </div>
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default App;
