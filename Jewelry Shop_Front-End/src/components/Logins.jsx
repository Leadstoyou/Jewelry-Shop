import React from 'react'
import '../style/Login.css'
const Logins = () => {

    
    return (
 <div className="containers">
  <div className="header-page">
    <h1>Đăng nhập</h1>
  </div>
  <form action="">
    <div className="email">
      <input required type="text" placeholder='Email' size={30} />
    </div>
    
    <div className="password">
      <input required type="password" size={30} placeholder='Mật khẩu' />
    </div>
    <div className="note">
    <a  href='http://localhost:5173'><span>Quên mật khẩu</span>  </a>? hoặc
   <a  href='http://localhost:5173/register'><span>Đăng kí</span>  </a>
    </div>
    <div className="action_button">
      <input type="submit" value={"Đăng Nhập"} className="btn" />
    </div>

  </form>
</div>

    )
}


export default Logins