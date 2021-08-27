import { useState, useRef } from "react";
import { auth } from "../apis/firebase";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import style from "../styles/Form.module.css";
import RainbowTextField from "../components/RainbowTextField";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import ClearIcon from '@material-ui/icons/Clear';

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
  // validation
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);

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

  const handlerEmail = (e: HTMLButtonEvent) => {
    setEmail(e.target.value);
    handleChange();
  };

  const back = () => router.push("/login");

  // error messafe
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
  };
  function Transition(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <div className={style.rapper}>
      <Snackbar
        open={open}
        message="登録しているメールアドレスを入力して下さい 🤖"
        onClose={handleClose}
        TransitionComponent={Transition}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        transitionDuration={{
          enter: 800,
          exit: 800,
        }}
        action={<ClearIcon onClick={handleClose}/>}
      />
      <h3 className={style.title}>パスワードリセット画面</h3>
      <Box mt={4}>
        <p className={style.bottomSpace}>Eメール</p>

        <RainbowTextField
          error={inputError}
          inputProps={{ required: true }}
          inputRef={inputRef}
          helperText={inputRef?.current?.validationMessage}
          label="input email"
          value={email}
          handleFunc={handlerEmail}
          type="email"
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
