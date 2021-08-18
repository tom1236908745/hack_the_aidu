import { useState, useEffect } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { buttonStyles } from "../components/layout";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    try {
      auth.signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        router.push("/");
      }
    });
  });
  const signUp = () => router.push("/signup");
  const resetPassword = () => router.push("/passreset");

  const classes = buttonStyles();
  return (
    <div>
      <p>ログイン画面</p>
      <Box mx={5} mb={3}>
        <h3>Eメールを入力して下さい</h3>
        <TextField
          className={classes.textForm}
          variant="outlined"
          id="custom-css-outlined-input"
          value={email}
          name="url"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box mx={5} mb={3}>
        <h3>パスワードを入力して下さい</h3>
        <TextField
          className={classes.textForm}
          variant="outlined"
          id="custom-css-outlined-input"
          value={password}
          name="url"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <div>
        <h3>アカウントをお持ちで無い方はこちら</h3>
        <Button autoFocus onClick={signUp} color="primary">
          ログイン
        </Button>
      </div>

      <div>
      <h3>パスワードをお忘れの方</h3>
      <Button autoFocus onClick={resetPassword} color="primary">　こちらをクリック</Button>
        
      </div>
    
    </div>
  );
}
