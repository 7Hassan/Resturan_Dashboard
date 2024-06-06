
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom"
import "./main.scss";
import { User } from '../../utils/interfaces';
import { url } from '../../utils/variables';
import { Loading, Title } from '../../utils/components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { portSaid } from '../../assets/images';


const Password = ({ password, handleChange }: { password: string, handleChange: (name: string, value: string) => void }) => {
  const [passShow, setPassShow] = useState(false)

  return <div className="input password">
    <input type={passShow ? 'text' : 'password'} className="input-field" placeholder='Password'
      name="password" value={password} onChange={e => handleChange(e.target.name, e.target.value)} />
    <i className="fa-solid fa-eye-slash"></i>
    <div className='icons' onClick={() => setPassShow(!passShow)}>
      <FontAwesomeIcon icon={passShow ? faEye : faEyeSlash} />
    </div>
  </div>
}






export const Login = ({ setUser }: { setUser: React.Dispatch<React.SetStateAction<User | null>> }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' })
  const { email, password } = form;
  const isEmail = useMemo(() => emailRegex.test(email), [email])
  const isDisabledForm = useMemo(() => !email || !password || !isEmail || password.length < 8,
    [email, password, isEmail]);
  const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value })
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isDisabledForm && !loading) setLoading(true);
  }
  useEffect(() => {
    if (!loading || isDisabledForm) return;
    fetch(`${url}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(form),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.msg);
        setUser(res.data);
        setLoading(false);
        navigate("/")
      }).catch((error) => {
        setLoading(false);
        toast.error(error.message);
      })
  }, [form, loading, setUser, isDisabledForm, navigate]);

  return <div className="auth">
    <Title title='Login' />
    <div className="container-st">
      <div className="header">
        <Link to="/">
          <div className="img">
            <img src={portSaid} alt="logo" />
          </div>
        </Link>
        <p className="welcome">Welcome back</p>
        <p>Please enter your detail to sign in.</p>

      </div>
      <div className="form">
        <form action="POST" onSubmit={(e) => handleSubmit(e)}>
          <div className="input">
            <input type="text" placeholder='Email' className="input-field" name="email"
              value={email} onChange={e => handleChange(e.target.name, e.target.value)} />
          </div>
          <Password password={password} handleChange={handleChange} />
          <div className="action">
            <button type='submit' disabled={isDisabledForm}
              className={`action-button ${isDisabledForm && 'disabled'}`}>
              {!loading && "Sign in"}
              {loading && <Loading type="white" />}
            </button>
          </div>
        </form>
      </div>
      <div className="sign-up">
        <div className="text">
          Don't have an account yet?
          <Link to="/register"> Sign Up </Link>
        </div>
      </div>
    </div>
  </div>;
};
