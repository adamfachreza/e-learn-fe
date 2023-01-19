import { useEffect, useState } from "react";
import { Modal,Container } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";


const PageListVideoUser= () => {
    
    const navigate = useNavigate();
    // list video
    const [dataListVideo, setDataListVideo] = useState([]);
    // modal video
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [linkVideo, setLinkVideo] = useState('');
    const [search, setCari] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            cari: search,
            token,
        }
        fetch(`${process.env.REACT_APP_API}/cariContent`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
            "Content-Type" : 'application/json'
        }
        })
        .then((res) => res.json())
        .then((hasil) => {
          console.log(dataSend)
            if(hasil.status === 'gagal'){{
                localStorage.removeItem('dataLoginUser');
                navigate('/',{replace:true})
            }}
            setDataListVideo(hasil.data);
        })
        .catch(err => {
            alert('=>>>>',err)
        })
    },[search])
    
    // close modal
  const handleClose = () => {
    setHandleShowVideo(false);
  };

  const logout = () => {
    localStorage.removeItem("dataLoginUser");
    navigate('/');
  }

  const quiz = () => {
    navigate('/quiz');
  }

  useEffect(() => {
    const login = localStorage.getItem("dataLoginUser");
    if(!login){
      navigate("/");
      return
    }
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("dataLoginUser");
    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/listContentPeserta`, {
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
            navigate("/");
            localStorage.removeItem('dataLoginUser');
            return
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

  return(
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
        </Modal.Footer>
      </Modal>

      <Container>
      
      <div className="jumbotron">
        <h1 className="display-4">Hello Ini Halaman Content Peserta!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p>
            <button className="btn btn-danger rounded-10" onClick={()=> logout()}>logout</button>
            <button className="btn btn-success rounded-10 ml-4" onClick={()=> quiz()}>Quiz</button>
        </p>
        <form className="form-inline">
            <input className="form-control mr-sm-2" style={{marginLeft:'auto'}} onChange={(e) => setCari(e.target.value)} type="search" />
            
        </form>
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
              </div>
            </div>
          );
        }):''}
      </div>
      </Container>
    </>
  )
}

export default PageListVideoUser;