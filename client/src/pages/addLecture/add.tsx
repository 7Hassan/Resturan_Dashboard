

import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { url, select } from '../../utils/variables';
import { Loading, Title } from '../../utils/components';
import "./main.scss";
import { portSaid } from "../../assets/images";



export const AddLecture = ({ globalGrade }: { globalGrade: string | null }) => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const inputs = select(globalGrade);
  const [form, setForm] = useState({})
  console.log('🚀 ~ form:', form)
  const handleChange = (name: string, value: string) =>{
setForm({ ...form, [name]: value })
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!loading) setLoading(true);
  }
  useEffect(() => {
    if (!loading) return;
    fetch(`${url}/api/add`, {
      method: 'POST',
      body: JSON.stringify({...form,table:globalGrade}),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.msg);
        setLoading(false);
        toast.success("Lecture Added", { autoClose: 2000 });
        setForm({})
      }).catch((error) => {
        setLoading(false);
        if (error.message === "Please login") return navigate("/login");
        toast.error(error.message);
      })
  }, [form, loading, navigate]);


  return <div className="auth">
    <Title title='Add' />
    <div className="container-st">
      <div className="header">
        <Link to="/">
          <div className="img">
            <img src={portSaid} alt="logo" />
          </div>
        </Link>
        <p className="welcome">Add to <span>{globalGrade}</span></p>
        <p>Please enter details</p>

      </div>
      <div className="form">
        <form action="POST" onSubmit={(e) => handleSubmit(e)}>
          {inputs.map((input) => (
            <div className="input" key={input.placeholder}>
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="input-field"
                name={input.name}
                value={form[input.name] || ''}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
          ))}
          <div className="action">
            <button
              type='submit'
              className={`action-button ${loading && 'disabled'}`}
            >
              {!loading ? "Add" : <Loading type="white" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
};




