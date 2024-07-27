import {
  Box,
  Button,
  Card,
  Container,
  Snackbar,
  Stack,
  styled,
  TextField
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
//import { styled } from '@mui/styles';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useAuth } from 'src/utils/auth';

const MainContent = styled(Box)(
  () => `
  height: 100%;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`
);

const SignIn = () => {
  const [snackbarMessage, setSnackBarMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();
  const { handleSignIn } = useAuth();

  const handleSignInBtn = async () => {
    if (emailInput == '' || passwordInput == '') {
      setSnackBarMessage('Preencha todos os campos!');
      return;
    }

    const requestSignIn = await handleSignIn(emailInput, passwordInput);
    if (requestSignIn.detail) {
      setSnackBarMessage('Email e/ou senha(s) incorretos(s)');
      return;
    }
    navigate('/');
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Snackbar
        open={snackbarMessage != ''}
        autoHideDuration={6000}
        onClose={() => setSnackBarMessage('')}
      >
        <MuiAlert style={{ color: 'whitesmoke' }} severity="error">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />

              <TextField
                label="Senha"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <Button
                onClick={handleSignInBtn}
                variant="outlined"
                style={{ marginTop: 40 }}
              >
                Login
              </Button>
            </Stack>
          </Card>
        </Container>
      </MainContent>
    </>
  );
};

export default SignIn;
