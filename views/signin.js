import { realpathSync } from "fs";

class Signin extends realpathSync.Component{
    render(){
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading">Đăng nhập</h2>
                <label for="inputEmail" className="sr-only">Nhập địa chỉ email
                </label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email" required autofocus />
                <label for="inputPassword" className="sr-only">Mật khẩu</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Mật khẩu" required />
                <button className="btn btn-lg btn-primary btn-block" type="button">Đăng nhập
                </button>
            </form>
        );
    }
}
ReactDOM.render(<Signin />, document.getElementById('app'));