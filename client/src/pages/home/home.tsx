
import "./main.scss"
// import { UpcomingEvents } from "../../components/upcomingEvents/upcomingEvents";
import { Nav } from "../../components/navbar/nav";
import { useEffect, useState } from "react";
import { url } from "../../utils/variables";
import { toast } from "react-toastify";
import { Tables, User } from "../../utils/interfaces";
import { Table } from "../../components/table/table";
import { Loading, Title } from "../../utils/components";

interface Home {
  user: User | null;
  isAuth: boolean;
  grade: string | null;
  setGrade: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}



const PopUser = ({ isAuth, setUser, cookie, setCookies }: { isAuth: boolean }) => {
  const [popUp, setPopUp] = useState(false);
  const [userTemp, setUserTemp] = useState(false);
  const [loading, setLoading] = useState(false);


  const cancel = () => {
    setCookies()
    setPopUp(false);
  }

  useEffect(() => {
    if (isAuth || !popUp || !userTemp || loading) return;
    setLoading(true);
    fetch(`${url}/auth/userTemp`, {
      method: 'GET',
      credentials: 'include',
      headers: { "Content-Type": "application/json" }
    })
      .then(async (res) => res.json())
      .then((res) => {
        setUserTemp(false);
        setLoading(false);
        if (!res.success) throw new Error(res.data.msg);
        setUser(res.data);
        setPopUp(false);
        setCookies();
      }).catch((err) => {
        setUserTemp(false)
        setLoading(false);
        toast.error(err.message);
      })
  }, [isAuth, loading, popUp, setUser, userTemp]);


  useEffect(() => {
    const timeoutId = setTimeout(() => { !isAuth && !cookie && setPopUp(true); }, 10000);
    return () => { clearTimeout(timeoutId) };
  }, [cookie, isAuth]);

  return <div className={`popup-user-temp ${popUp && "show"}`}>
    <div className="container">
      <div className="text">
        <span>  Welcome to our world!</span>
        <br />
        If you'd like to experience this web as an admin, please confirm this message.
      </div>
      <div className="buttons">
        {!isAuth && !cookie &&
          <>
            <button className="cancel" onClick={cancel}>cancel</button>
            <button onClick={() => setUserTemp(true)}>
              {!loading && "Confirm"}
              {loading && <Loading type="white" />}
            </button>
          </>
        }
      </div>
    </div>
  </div >
}

export const Home = ({ user, setUser, isAuth, grade, setGrade }: Home) => {
  const [table, setTable] = useState<Tables | null>(null);
  const [cookie, setCookie] = useState(document.cookie);


  const setCookies = () => {
    const now = new Date();
    const expires = new Date(now.getTime() + 60 * 60 * 1000);
    document.cookie = `popUp=none; expires=${expires.toUTCString()}; path=/`;
    setCookie(document.cookie)
  }

  useEffect(() => {
    fetch(`${url}/api/get`, {
      method: 'PUT',
      body: JSON.stringify({
        "table": grade
      }),
      headers: { "Content-Type": "application/json" }
    }).then(async (res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.data.msg);
        setTable(res.data)
      }).catch((err) => {
        const errRes = err.message
        toast.error(errRes, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
  }, [grade])

  return <>
    <Title title='Home' />
    <Nav grade={grade} setGrade={setGrade} user={user} setUser={setUser} setCookies={setCookies} />
    <PopUser isAuth={isAuth} setUser={setUser} cookie={cookie} setCookies={setCookies} />
    <div className="contain">
      <div className="content-container">
        <div className="home">
          <div className="container-st">
            {/* <UpcomingEvents table={table} /> */}
            <Table grade={grade} table={table} isAuth={isAuth} setTable={setTable} />
          </div>
        </div>
      </div>
    </div>
  </>
};

