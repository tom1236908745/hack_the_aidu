import { useState } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import style from "../styles/Form.module.css";
import RainbowTextField from "../components/RainbowTextField";

interface HTMLButtonEvent extends Event {
  target: HTMLButtonElement;
}
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const signup = () => {
    try {
      if (email == "") {
        alert("必須項目です");
        return false;
      }
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            "入力されたアドレスにパスワードリセット用のメールを送りました。"
          );
          router.push("/login");
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました。通信環境を確認して下さい。");
        });
    } catch (err) {
      alert(err);
    }
  };
  const handlerEmail = (e: HTMLButtonEvent) => setEmail(e.target.value);
  const back = () => router.push("/login");
  return (
    <div className={style.rapper}>
      <h3 className={style.title}>パスワードリセット画面</h3>
      <Box mt={4}>
        <p className={style.bottomSpace}>Eメール</p>

        <RainbowTextField
          label="input email"
          value={email}
          handleFunc={handlerEmail}
        />
      </Box>
      <Box mt={6} className={style.flow}>
        <Button variant="contained" onClick={signup} color="primary">
          送信
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button variant="contained" onClick={back} color="primary">
          戻る
        </Button>
      </Box>
    </div>
  );
}
