import { useState, useEffect } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import style from "../styles/Form.module.css";
import RainbowTextField from "../components/RainbowTextField";

interface HTMLButtonEvent extends Event {
  target: HTMLButtonElement;
}

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

  const handlerEmail = (e:HTMLButtonEvent) => setEmail(e.target.value);
  const handlerPassword = (e:HTMLButtonEvent) => setPassword(e.target.value);
  return (
    <div className={style.rapper}>
      <h3 className={style.title}>ログイン画面</h3>

      <Box mt={4}>
        <p>Eメール</p>
        <RainbowTextField
              label="input url"
              value={email}
              handleFunc={handlerEmail}
            />
      </Box>
      <Box>
        <p>パスワード</p>
        <RainbowTextField
              label="input password"
              value={password}
              handleFunc={handlerPassword}
            />
      </Box>
      <Box mt={6}>
        <Button variant="contained" onClick={login} color="primary">
          ログイン
        </Button>
      </Box>

      <div className={style.items}>
        <Box mb={4}>
          <p className={style.thinFont}>アカウントをお持ちで無い方</p>
          <Button variant="contained" onClick={signUp} color="primary">
            サインアップ
          </Button>
        </Box>

        <Box>
          <p className={style.thinFont}>パスワードをお忘れの方</p>
          <Button variant="contained" onClick={resetPassword} color="primary">
            こちらをクリック
          </Button>
        </Box>
      </div>
    </div>
  );
}
