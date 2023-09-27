import React from 'react'
import '../style/Register.css'
const Registers = () => {
  const inputStyle = {
    width: '230px',    // Độ rộng 100%
    height: '32px',   // Độ cao 55px
  };
  return (

    <div className="container">
      <div className="header-page">
        <h1>Đăng ký</h1>
      </div>
      <form action="">
        <div className="first_name">
          <input required type="text" placeholder='Tên' size={30} />
        </div>
        <div className="last_name">
          <input required type="text" placeholder='Họ' size={30} />
        </div>
        <div className="gender">
          <input type="radio" id="radio1" value={1} size={30} />
          <label htmlFor="radio1">Nam</label>
          <input type="radio" id="radio2" value={2} size={30} />
          <label htmlFor="radio2">Nữ</label>
        </div>
        <div className="birthday">
          <input type="date" style={inputStyle} placeholder='Ngày sinh nhật' />
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