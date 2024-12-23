import React, { useState } from "react";
import "./OriginAuth.css";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,

} from "@mui/material";

interface OriginAuthProps {
  idError: string,
  setIdError: React.Dispatch<React.SetStateAction<string>>,
  passwordError: string,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>,
  googleLogin: () => void,
  onSubmit: (id: string, password: string, isLogin: boolean) => void,
}

const OriginAuth: React.FC<OriginAuthProps> = ({ idError,setIdError,passwordError,setPasswordError, googleLogin,onSubmit }) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // エラーのリセット
    setIdError("");
    setPasswordError("");

    // バリデーション
    let hasError = false;
    if (!id) {
      setIdError("ユーザIDを入力してください");
      hasError = true;
    }
    if (!password) {
      setPasswordError("パスワードを入力してください");
      hasError = true;
    }

    // エラーがなければ送信
    if (!hasError) {
      onSubmit(id, password, isLogin);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
  };

  return (
    <div className="auth-container">
      <Paper
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          width: "25vw",
          minWidth: "250px",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isLogin ? "ログイン" : "新規登録"}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            style={{
              margin: "1vh 0",
            }}
            required
            fullWidth
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            label="ユーザID"
            name="id"
            autoComplete="id"
            autoFocus
            error={idError!=""}
            helperText={idError}
            FormHelperTextProps={{
              sx: { color: "error.main" }, // エラーメッセージの色設定
            }}
            sx={{
              input: {
                height: "15px", // 入力欄の高さ
                fontSize: "1rem", // フォントサイズ
              },
            }}
          />

          <TextField
            style={{
              margin: "1vh 0",
            }}
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            error={passwordError!=""}
            helperText={passwordError ? "パスワードを入力してください" : " "}
            FormHelperTextProps={{
              sx: { color: "error.main" }, // エラーメッセージの色設定
            }}
            sx={{
              input: {
                height: "15px", // 入力欄の高さ
                fontSize: "1rem", // フォントサイズ
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              margin: "1vh 0",
            }}
          >
            {isLogin ? "ログイン" : "登録"}
          </Button>

          <Grid item>
            <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "新規登録はこちら" : "ログインはこちら"}
            </Link>
          </Grid>
        </Box>

        {isLogin && <>

          <Box margin="4vh">
            <Divider >
              <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={<FcGoogle />}
            sx={{
              textTransform: "none", // 文字を大文字にしない
            }}
          >
            Googleでログイン
          </Button>
        </>}
      </Paper>

    </div>
  );
};

export default OriginAuth;
