import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import NavbarComponent from "./NavbarComponents";


const ListVideoAdmin = () => {
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  // list video
  const [dataListVideo, setDataListVideo] = useState([]);
  // modal video
  const [handleShowVideo, setHandleShowVideo] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");

  // simpan
  const [lgShow, setLgShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [link_thumbnail, setLinkThumbnail] = useState("");
  const [link_video, setSaveLinkVideo] = useState("");
  // delete
  const [show, setShowDelete] = useState(false);
  const [idDel, setIdDel] = useState("");
  // update
  const [showEdit, setShowEdit] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");

  // close modal
  const handleClose = () => {
    setHandleShowVideo(false);
    setShowDelete(false);
  };
  // show modal
  const handleShow = (id) => {
    setShowDelete(true);
    setIdDel(id);
  };

  useEffect(() => {
    const login = localStorage.getItem("dataLoginAdmin");
    if(!login){
      navigate("/login-admin");
    }
    getData();
  }, []); // biar g muncul terus pas di tambahin array kosong

  // Get Data Content
  const getData = () => {
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/listContent`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log('data', hasil)
        if(hasil.status === 'berhasil'){
            setDataListVideo(hasil.data);
        }else{
            navigate("/login-admin");
            localStorage.removeItem('dataLoginAdmin');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Play video di modal
  const handleOpenVideo = (data) => {
    setHandleShowVideo(true);
    setLinkVideo(data.link_video);
  };

  // Clear State
  const clearState = () => {
    setJudul("");
    setKeterangan("");
    setLinkThumbnail("");
    setSaveLinkVideo("");
  };

  // Simpan Content
  const handleSimpan = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      judul: judul,
      keterangan: keterangan,
      link_thumbnail: link_thumbnail,
      link_video: link_video,
      token: token,
    };
    if (
      judul === "" ||
      keterangan === "" ||
      link_thumbnail === "" ||
      link_video === ""
    ) {
      Swal.fire("Gagal", "Form Harus Diisi Semua", "error");
      return;
    }
    fetch(`${process.env.REACT_APP_API}/tambahContent`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log("hasil =>", hasil);
        setLgShow(false);
        clearState();
        if (hasil.status === "berhasil") {
          Swal.fire("success", hasil.message, "success");
          getData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
  };

  // Delete Content
  const handleDelete = () => {
    // e.preventDefault();
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      id: idDel,
      token: token,
    };
    fetch(`${process.env.REACT_APP_API}/hapusContent`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        getData();
        setShowDelete(false);
        Swal.fire("success", hasil.message, "success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Simpan Content
  const handleUpdate = (data) => {
    setShowEdit(true);
    setIdUpdate(data.id);
    setJudul(data.judul);
    setKeterangan(data.keterangan);
    setLinkThumbnail(data.link_thumbnail);
    setSaveLinkVideo(data.link_video);
  };

  const handleUpdateSimpan = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dataLoginAdmin");
  
    const dataSend = {
      id: idUpdate,
      judul: judul,
      keterangan: keterangan,
      link_thumbnail: link_thumbnail,
      link_video: link_video,
      token: token,
    };
    fetch(`${process.env.REACT_APP_API}/ubahContent`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log(hasil);
        if (hasil.status === "berhasil") {
          getData();
          clearState();
          setShowEdit(false);
          Swal.fire("success", hasil.message, "success");
        } else {
          clearState();
          Swal.fire("failed", hasil.message, "error");
        }
      })
      .catch((err) => {
        clearState();
        alert(err);
      });
  };

  return (
    <>
      {/* {modal play} */}
      <Modal
        show={handleShowVideo}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="h-auto">
            {
              <>
                <ReactPlayer
                  pip={true}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        origin: window.location.origin,
                      },
                    },
                  }}
                  width="100%"
                  height="300px"
                  controls={true}
                  url={`${linkVideo}`}
                />
              </>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

      {/* modal tambah video */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Tambah Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="judul">Judul</label>
              <input
                type="text"
                name="judul"
                value={judul}
                className="form-control"
                placeholder="Judul"
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="keterangan">Keterangan</label>
              <input
                type="text"
                name="keterangan"
                value={keterangan}
                className="form-control"
                placeholder="Keterangan"
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link_thumbnail">Link Thumbnail</label>
              <input
                type="text"
                name="link_thumbnail"
                value={link_thumbnail}
                className="form-control"
                placeholder="Link Thumbnail"
                onChange={(e) => setLinkThumbnail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link_video">Link Video</label>
              <input
                type="text"
                name="link_video"
                value={link_video}
                className="form-control"
                placeholder="Link Video"
                onChange={(e) => setSaveLinkVideo(e.target.value)}
              />
            </div>
            <button
              className="btn brn-primary"
              onClick={(e) => handleSimpan(e)}
            >
              Simpan
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* modal delete */}
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

      {/* modal edit video */}
      <Modal
        size="lg"
        show={showEdit}
        onHide={() => setShowEdit(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="judul">Judul</label>
              <input
                type="text"
                name="judul"
                value={judul}
                className="form-control"
                placeholder="Judul"
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="keterangan">Keterangan</label>
              <input
                type="text"
                name="keterangan"
                value={keterangan}
                className="form-control"
                placeholder="Keterangan"
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link_thumbnail">Link Thumbnail</label>
              <input
                type="text"
                name="link_thumbnail"
                value={link_thumbnail}
                className="form-control"
                placeholder="Link Thumbnail"
                onChange={(e) => setLinkThumbnail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link_video">Link Video</label>
              <input
                type="text"
                name="link_video"
                value={link_video}
                className="form-control"
                placeholder="Link Video"
                onChange={(e) => setSaveLinkVideo(e.target.value)}
              />
            </div>
            <button
              className="btn brn-primary"
              onClick={(e) => handleUpdateSimpan(e)}
            >
              Simpan
            </button>
          </form>
        </Modal.Body>
      </Modal>

    <Container>
      <NavbarComponent />
      <div className="jumbotron">
        <h1 className="display-4">Hello Ini Halaman Content Admin!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setLgShow(true)}
          >
            {" "}
            + Tambah Video
          </button>
        </p>
      </div>
    </Container>
    <Container>
      <div className="row justify-content-center">
        {dataListVideo?dataListVideo.map((data, index) => {
          return (
            <div
              key={index}
              className="card m-3 col-md-4 col-lg"
              style={{ width: "18rem", height: "auto", border: "none" }}
            >
              <img
                onClick={() => handleOpenVideo(data)}
                className="card-img-top"
                src={data.link_thumbnail}
                alt="thumbnail"
                style={{ width: "18rem", height: "auto", border: "none" }}
              />
              <div className="card-body">
                <h5 className="card-title">{data.judul}</h5>
                <p className="card-text">{data.keterangan}</p>
                <button
                  className="btn btn-danger mr-3"
                  onClick={() => handleShow(data.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success mr-3"
                  onClick={() => handleUpdate(data)}
                >
                  Update
                </button>
              </div>
            </div>
          );
        }):''}
      </div>
      </Container>
    </>
  );
};

export default ListVideoAdmin;
