import { useState } from 'react'
import { auth } from '../apis/firebase'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { buttonStyles } from "../components/layout";

export default function SignUp() {

    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const signup = () => {
        try{

            if(email == ""){
                alert('必須項目です')
                return false
            }
            auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('入力されたアドレスにパスワードリセット用のメールを送りました。')
                router.push('/login')
            }).catch(() => {
                alert('パスワードリセットに失敗しました。通信環境を確認して下さい。')
            })
            
        } catch(err) {
            alert(err)
        }
    }

    const back = () => router.push('/login');
    const classes = buttonStyles();
    return (
        <div>
            <p>パスワードリセット画面</p>
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
            
            
      <Button autoFocus onClick={signup} color="primary">
        送信
      </Button>
      <Button autoFocus onClick={back} color="primary">
        戻る
      </Button>
        </div>

    )
}