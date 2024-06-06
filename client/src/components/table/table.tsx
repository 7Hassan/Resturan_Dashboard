
import { format } from "date-fns";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Lecture as LectureInterface, Table as TableInterface } from "../../utils/interfaces";
import "./main.scss"
import { Loading } from "../../utils/components";
import { days, url } from "../../utils/variables";
import { toast } from "react-toastify";
import { arrow, edit, remove } from "../../assets/images";





const Action = ({ grade, _id, setTable }: { lecId: string }) => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<null | string>(null)

  useEffect(() => {
    if (!id) return;
    setLoading(true)
    fetch(`${url}/api/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        "table": grade,
        "_id": id
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(async (res) => res.json())
      .then((res) => {
        setLoading(false)
        if (!res.success) throw new Error(res.data.msg);
        setTable(res.data)
      }).catch((err) => {
        setLoading(false)
        const errRes = err.message
        toast.error(errRes);
      })
  }, [id, setTable]);


  return <td className="actions">
    <div className="edit">
      <Link to={`${grade}/${_id}`}>
        <img src={edit} alt="edit" />
      </Link>
    </div>
    <div className="remove" onClick={() => setId(_id)}>
      {
        !loading &&
        <img src={remove} alt="remove" />
      }

      {
        loading && <Loading type="color" />
      }
    </div>
  </td>
}

const Lecture = ({ item, grade, isAuth, setTable }: { lec: LectureInterface, isAuth: boolean }) => {
  const obj = { ...item };
  delete obj._id;
  const values = Object.values(obj);

  return <tr className="lec">
    {values.map((value) => <td key={value}> {value}</td>)}
    {isAuth && <Action grade={grade} _id={item._id} setTable={setTable} />}
  </tr>
}


const TableBody = ({ grade, table, isAuth, setTable }: { table: TableInterface | undefined, isAuth: boolean }) => {

  return <tbody>
    {
      table.map((item) => {
        return <React.Fragment key={item._id}>
          <Lecture key={item._id} grade={grade} item={item} isAuth={isAuth} setTable={setTable} />
        </React.Fragment>
      })
    }

  </tbody>
}


export const Table = ({ grade, table, isAuth, setTable }: { table: TableInterface | undefined, isAuth: boolean }) => {
  const keys = (!!table && table.length > 0) ? Object.keys(table[0]) : null;
  return <div className="table">
    <div className="title">
      {grade}
    </div>
    <div className="btns">
      <button className="export">
        <img src={arrow} alt="arrow" />
        <p>
          Export
        </p>
      </button>
      {isAuth &&
        <button>
          <Link to="addLecture">
            Add
          </Link>
        </button>
      }
    </div>

    <div className="container">
      <div className="table-holder">
        <div className="cont-table">
          <table >
            <thead>
              <tr>
                {
                  keys && keys.map((key) => key != '_id' && <th key={key} scope="col">{key}</th>)
                }
              </tr>
            </thead>
            {!!table && table.length > 0 && <TableBody grade={grade} table={table} isAuth={isAuth} setTable={setTable} />}
          </table>
        </div>
      </div>
    </div>
  </div>
};
