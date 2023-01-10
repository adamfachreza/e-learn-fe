import { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState([]);
//   const [lgShow, setLgShow] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('dataLoginAdmin');
    if(!token){
        navigate("/login-admin")
    }
    getDataUser();
  },[]);
  
  const getDataUser = () => {
    const token = localStorage.getItem('dataLoginAdmin');
    const dataSend = {
        token
    }
    fetch(`${process.env.REACT_APP_API}/listAdmin`,{
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(hasil=>{
        console.log(hasil)
        if(hasil.status === 'berhasil'){
            setDataUser(hasil.data);
        }else{
            navigate("/login-admin");
            localStorage.removeItem('dataLoginAdmin');
        }
    })
  }

  return (
    <>
    <h1 className="text-center pb-5 mb-5 mt-5">List Users</h1>
      <Container>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default ListUser;
