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
            auth.createUserWithEmailAndPassword(email, password);
            router.push('/')
        } catch(err) {
            alert(err)
        }
    }
    const back = () => router.push('/login')
    return (
        <div>
             <p>サインアップ画面</p>
            <label>
                <h3>Eメールを入力して下さい</h3>
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <h3>パスワードを入力して下さい</h3>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <br />
            <Button onClick={signup}>
                Ckick here
            </Button>
            <Button onClick={back}>
                戻る
            </Button>
        </div>

    )
}