

// import { Link, useNavigate, useParams } from "react-router-dom"
// import { useState, useMemo, useEffect } from "react"
// import { toast } from 'react-toastify';
// import { days, grades, url } from '../../utils/variables';
// import { Loading, Title } from '../../utils/components';
// import { Clock } from "../../utils/components";
// import { isBefore, isSameHour, isSameMinute } from "date-fns";
// import "./main.scss";
// import { Lecture } from "../../utils/interfaces";
// import { portSaid } from "../../assets/images";

import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { url, select } from '../../utils/variables';
import { Loading, Title } from '../../utils/components';
import "./main.scss";
import { portSaid } from "../../assets/images";

interface Form {
  lecture: Lecture,
  setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export const Form = ({ lecture, setLecture }: Form) => {
  const { id, grade } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const inputs = select(grade);
  const [form, setForm] = useState({ ...lecture });
  const values = Object.values(form);
  const keys = Object.keys(form);
  const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!loading) setLoading(true);
  }

  useEffect(() => {
    if (!loading) return;
    fetch(`${url}/api/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ table: grade, ...form }),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('🚀 ~ res:', res)
        if (!res.success) throw new Error(res.msg);
        navigate("/")
        toast.success("Lecture Updated", { autoClose: 2000 })
        setLoading(false)

      }).catch((error) => {
        toast.error(error.message)
        setLoading(false);
      })
  }, [lecture, loading]);

  return <form action="POST" onSubmit={(e) => handleSubmit(e)}>
    {inputs.map((input, i) => (
      <div className="input" key={input.placeholder}>
        <input
          type={input.type}
          placeholder={input.placeholder}
          className="input-field"
          name={input.name}
          value={values[i] || ''}
          onChange={(e) => handleChange(keys[i], e.target.value)}
        />
      </div>
    ))}
    <div className="action">
      <button
        type='submit'
        className={`action-button ${loading && 'disabled'}`}
      >
        {!loading ? "Save" : <Loading type="white" />}
      </button>
    </div>
  </form>

};


export const Edit = () => {
  const { id, grade } = useParams();
  const [lecture, setLecture] = useState<Lecture | null>(null)
  console.log('🚀 ~ lecture:', lecture)

  useEffect(() => {
    fetch(`${url}/api/get/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ table: grade }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.msg);
        setLecture(res.data);
      }).catch((error) => {
        toast.error(error.message);
      })
  }, [id, grade]);

  return <div className="auth">
    <Title title='Edit lecture' />
    <div className="container-st">
      <div className="header">
        <Link to="/">
          <div className="img">
            <img src={portSaid} alt="logo" />
          </div>
        </Link>
        <p className="welcome">Edit {grade}</p>
        <p>Please enter details</p>

      </div>
      <div className={`form ${!lecture && "loading-st"}`}>
        {
          !lecture && <Loading type="color" />
        }
        {
          lecture && <Form lecture={lecture[0]} setLecture={setLecture} />
        }
      </div>
    </div>
  </div>;
};
