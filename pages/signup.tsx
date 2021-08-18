import { useState } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { buttonStyles } from "../components/layout";

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

  const classes = buttonStyles();
  return (
    <div>
      <p>サインアップ画面</p>
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
      <br />
      <br />
      <Button autoFocus onClick={signup} color="primary">
        サインアップ
      </Button>
      <Button autoFocus onClick={back} color="primary">
        戻る
      </Button>
    </div>
  );
}
