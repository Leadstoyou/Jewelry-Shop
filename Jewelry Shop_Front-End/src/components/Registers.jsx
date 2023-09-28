import React from 'react'
import '../style/Register.css'
const Registers = () => {
 
  return (

    <div className="container">
      <div className="header-page">
        <h1>Đăng ký</h1>
      </div>
      <form action="">
        <div className="user_name">
          <input required type="text" placeholder='Họ và Tên' size={30} />
        </div>
        
        <div className="gender">
          <input type="radio" id="radio1" value={1} size={30} />
          <label htmlFor="radio1">Nam</label>
          <input type="radio" id="radio2" value={2} size={30} />
          <label htmlFor="radio2">Nữ</label>
        </div>
        <div className="age">
          <input type="text"  placeholder='Tuổi'  size={30}/>
        </div>
        <div className="email">
          <input type="email" size={30} placeholder='Email' />
        </div>
        <div className="password">
          <input type="password" size={30} placeholder='Mật khẩu' />
        </div>
        <div className="action_button">
          <input  type="submit" value={"Đăng Ký"} className="btn" />
        </div>
      </form>
    </div>
  )
}

export default Registers