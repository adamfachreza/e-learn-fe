import { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponents";

const ListAdmin = () => {
    const navigate = useNavigate();
    const [dataAdmin, setDataAdmin] = useState([]);
    const [tambahAdmin, setTambahAdmin] = useState(false);
    const [name, setNama] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // delete
    const [show, setShowDelete] = useState(false);
    const [idDel, setIdDel] = useState("");
    // update
    const[showEdit, setShowEdit] = useState(false);
    const[idUpdate, setIdUpdate] = useState("");

    // close modal
  const handleClose = () => {
    setShowDelete(false);
  };

  const handleShow = (id) => {
    setShowDelete(true);
    setIdDel(id);
  };


  useEffect(() => {
    const token = localStorage.getItem('dataLoginAdmin');
    if(!token){
        navigate("/login-admin")
    }
    getDataAdmin();
  },[]);
  
  const getDataAdmin = () => {
    const token = localStorage.getItem('dataLoginAdmin');
    const dataSend = {
        token
    }
    fetch(`${process.env.REACT_APP_API}/listAdmin`,{
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((hasil)=>{
        console.log(hasil)
        if(hasil.status === 'berhasil'){
            setDataAdmin(hasil.data);
        }else{
            navigate("/login-admin");
            localStorage.removeItem('dataLoginAdmin');
        }
    })
    .catch((err) => {
      alert(err);
    })
  }

  // Clear State
  const clearState = () => {
    setNama("");
    setEmail("");
    setPassword("");
    
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("dataLoginAdmin");
    const Swal = require("sweetalert2");
    const dataSend = {
      name: name,
      email:email,
      password:password
    };
    if(
      name === '' ||
      email === '' ||
      password === ''
    ){
      Swal.fire("Gagal", "Form Harus Diisi Semua", "error");
      return;
    }
    fetch(`${process.env.REACT_APP_API}/tambahAdmin`,{
      method: "POST",
      body:JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((hasil) => {
      console.log("hasil =>", hasil);
      setTambahAdmin(false);
      clearState();
      if(hasil.status === 'berhasil'){
        Swal.fire("success", hasil.message, "success");
        getDataAdmin();
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  }

  const handleDelete = () => {
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      id: idDel,
      token: token,
    };
    fetch(`${process.env.REACT_APP_API}/hapusAdmin`, {
      method:"POST",
      body: JSON.stringify(dataSend),
      headers : {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((hasil) => {
      getDataAdmin();
      setShowDelete(false);
      Swal.fire("success", hasil.message, "success");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleUpdate = (data) => {
    setShowEdit(true);
    setIdUpdate(data.id);
    setNama(data.name);
    setEmail(data.email);
    
  };

  const handleUpdateSimpan = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dataLoginAdmin");
    const Swal = require("sweetalert2");
    const dataSend = {
      id: idUpdate,
      name: name,
      email: email,
      password: password,
      token: token
    };
    fetch(`${process.env.REACT_APP_API}/ubahAdmin`, {
      method:"POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((hasil) => {
      console.log(hasil);
      if(hasil.status === "berhasil"){
        getDataAdmin();
        clearState();
        setShowEdit(false);
        Swal.fire("success", hasil.message, "success");
      }else{
        clearState();
        Swal.fire("failed", hasil.message, "error");
      }
    })
    .catch((err) => {
      clearState();
      alert(err);
    });
  }

  return (
    <>
    {/* Modal Tambah Admin */}
      <Modal
        size="lg"
        show={tambahAdmin}
        onHide={() => setTambahAdmin(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Tambah Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setNama(e.target.value)}aria-describedby="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}id="password" aria-describedby="password" />
          </div>
         
          <button onClick={(e) => handleSimpan(e)} className="btn btn-primary">Simpan</button>
        </form>
        </Modal.Body>
      </Modal>

    {/* Modal Delete Admin */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Modal Edit Admin */}
    <Modal
        size="lg"
        show={showEdit}
        onHide={() => setShowEdit(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setNama(e.target.value)}aria-describedby="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}aria-describedby="name" />
          </div>
         
          <button onClick={(e) => handleUpdateSimpan(e)} className="btn btn-primary">Simpan</button>
        </form>
        </Modal.Body>
      </Modal>
      <NavbarComponent />
    <h1 className="text-center pb-5 mb-5 mt-5">List Admins</h1>
      <div>
        
      <Container>
      <button className="btn btn-primary btn-rounded mb-4" onClick={() => setTambahAdmin(true)}> + Tambah Admin</button>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
           {
            dataAdmin.map((data, index) => {
              return (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <button className="btn btn-rounded btn-danger mr-3" onClick={() => handleShow(data.id)}>Hapus</button>
                  <button className="btn btn-rounded btn-success" onClick={() => handleUpdate(data)}>Edit</button>
                </td>
              </tr>
              )
            })
           }
          </tbody>
        </table>
      </Container>
      </div>
    </>
  );
};

export default ListAdmin;
