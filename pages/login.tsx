import { useState } from 'react'
import { auth } from '../apis/firebase'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';

export default function Login() {

    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = () => {
        try{
            auth.signInWithEmailAndPassword(email, password);
            router.push('/')
        } catch(err) {
            alert(err)
            console.log(err)
        }
    }

    const signUp= () => router.push('/signup')
    const resetPassword = () => router.push('/passreset')
    return (
        <div>
            <p>ログイン画面</p>
            <label>
                <h3>Eメールを入力して下さい</h3>
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <h3>パスワードを入力して下さい</h3>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <Button onClick={login}>
                ログイン
            </Button>
            <br />
            <br />
            <br />
            <br />
            <label>
                <h3>アカウントをお持ちで無い方はこちら</h3>
                <Button onClick={signUp}>
                　サインアップ
                </Button>
            </label>
            <br />
            <br />
            <br />
            <br />
            <label>
                <h3>パスワードをお忘れの方</h3>
                <Button onClick={resetPassword}>
                　こちらをクリック
                </Button>
            </label>
        </div>

    )
}