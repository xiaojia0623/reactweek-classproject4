import {  useState } from 'react'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const LoginPage = ({getProducts, setIsLogin}) => {

    //綁定帳號以及預設值
    const [myAccount, setMyAccount] = useState({
        username:'email@example.com',
        password:'example'
    })

    //監聽輸入input事件，將myAccount綁定到事件內
    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setMyAccount({
        ...myAccount,
        [name]: value
        });
    }

    //點擊登入按鈕去求api
    const handleLogin = async (e) => {
        e.preventDefault(); //移除原生預設事件(form表單)

        try{ //串接登入api
            const res = await axios.post(`${BASE_URL}/v2/admin/signin`,myAccount);
            const {token, expired} = res.data;

            //將token存進cookie裡面
            document.cookie = `jiafei123456=${token}; expires=${new Date(expired)}`;

            //發動請求時headers都會帶上token
            axios.defaults.headers.common['Authorization'] = token;

            //getProducts();
            setIsLogin(true); //若已登入的狀態則顯示true
        }catch(error) {
            alert('登入失敗')
        }
    }


  return (
    <div className='login-page d-flex'>
        <div >
            <h1>請先登入</h1>
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="form-floating mb-3">
                    <input name='username' value={myAccount.username} onChange={handleInputChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input name='password' value={myAccount.password} onChange={handleInputChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100">登入</button>
            </form>
        </div>
     
        <div>
            <img src="https://media.istockphoto.com/id/1016968886/photo/business-technology-internet-and-networking-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=5Xf4t-rZX7_H9JWF8jrHN2C0tVJ9zgOeZ5R2TxSZ-oQ=" alt="" />
        </div>
    </div>
  )
}

export default LoginPage
