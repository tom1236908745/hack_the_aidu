import { useState } from 'react'
import { auth } from '../apis/firebase'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';

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

    const back = () => router.push('/login')
    return (
        <div>
            <p>パスワードリセット画面</p>
            <label>
                <h3>Eメールを入力して下さい</h3>
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            
            <br />
            <br />
            <Button onClick={signup}>
                送信する
            </Button>
            <Button onClick={back}>
                戻る
            </Button>
        </div>

    )
}