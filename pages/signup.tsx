import { useState, useRef } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import style from "../styles/Form.module.css";
import RainbowTextField from "../components/RainbowTextField";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import ClearIcon from "@material-ui/icons/Clear";

interface HTMLButtonEvent extends Event {
  target: HTMLButtonElement;
}
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        handleOpen();
      });
  };
  const back = () => router.push("/login");


  // validation
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);

  const inputRef2 = useRef(null);
  const [inputError2, setInputError2] = useState(false);

  const handleChange = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
      } else {
        console.log(ref.validity.valid);
        setInputError(false);
      }
    }
  };

  const handleChange2 = () => {
    if (inputRef2.current) {
      const ref2 = inputRef2.current;
      if (!ref2.validity.valid) {
        setInputError2(true);
      } else {
        setInputError2(false);
      }
    }
  };
  const handlerEmail = (e: HTMLButtonEvent) => {
    setEmail(e.target.value);
    handleChange();
  };
  const handlerPassword = (e: HTMLButtonEvent) => {
    setPassword(e.target.value);
    handleChange2();
  };

  // error messafe
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function Transition(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <div className={style.rapper}>
      <h3 className={style.title}>サインアップ画面</h3>
      <Snackbar
        open={open}
        message="メールアドレス、パスワードを確認して下さい 😇"
        onClose={handleClose}
        TransitionComponent={Transition}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        transitionDuration={{
          enter: 800,
          exit: 800,
        }}
        action={<ClearIcon onClick={handleClose} />}
      />
      <RainbowTextField
        text="Eメール"
        error={inputError}
        inputRef={inputRef}
        helperText={inputRef?.current?.validationMessage}
        label="input email"
        value={email}
        handleFunc={handlerEmail}
        type="email"
        text2="パスワード"
        error2={inputError2}
        inputRef2={inputRef2}
        inputProps2={{ minLength: 6, required: true }}
        helperText2={inputRef2?.current?.validationMessage}
        label2="input password"
        value2={password}
        handleFunc2={handlerPassword}
        type2="password"
      />
      <Box mt={6} className={style.flow}>
        <Button variant="contained" onClick={signup} color="primary">
          サインアップ
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button variant="contained" onClick={back} color="primary">
          戻る
        </Button>
      </Box>
    </div>
  );
}
