import { useState } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import style from "../styles/Form.module.css";
import RainbowTextField from "../components/RainbowTextField";

interface HTMLButtonEvent extends Event {
  target: HTMLButtonElement;
}
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signup = () => {
    try {
      auth.createUserWithEmailAndPassword(email, password);

      router.push("/");
    } catch (err) {
      alert(err);
    }
  };
  const back = () => router.push("/login");
  const handlerEmail = (e:HTMLButtonEvent) => setEmail(e.target.value);
  const handlerPassword = (e:HTMLButtonEvent) => setPassword(e.target.value);

  return (
    <div className={style.rapper}>
      <h3 className={style.title}>サインアップ画面</h3>
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
      <Box mt={6} className={style.flow}>
        <Button variant="contained" onClick={signup} color="primary">
          送信
        </Button>
        &nbsp;
        &nbsp;
        &nbsp;
        <Button variant="contained" onClick={back} color="primary">
          戻る
        </Button>
      </Box>
      
    </div>
  );
}
