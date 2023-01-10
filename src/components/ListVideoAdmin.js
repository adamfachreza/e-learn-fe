import { useEffect, useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";
import Swal from 'sweetalert2'

const ListVideoAdmin = () => {
    const [dataListVideo, setDataListVideo] = useState([]);
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [linkVideo, setLinkVideo] = useState('');
    const [lgShow, setLgShow] = useState(false);
    const [judul, setJudul] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [link_thumbnail, setLinkThumbnail] = useState('');
    const [link_video, setSaveLinkVideo] = useState('');
    
    
    const handleClose = () => {
        setHandleShowVideo(false)
    }
    useEffect(()=>{
        getData()
    },[]) // biar g muncul terus pas di tambahin array kosong

    // Get Data Content
    const getData=()=>{
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listContent`,{
            method:'POST',
            mode:'cors',
            body: JSON.stringify(dataSend),
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
                
                }
        })
        .then(res => res.json())
        .then(hasil => {
            // console.log('data', hasil)
            setDataListVideo(hasil.data)
        })
        .catch(err => {
            alert(err)
        });
    };

    // Play video di modal
    const handleOpenVideo = (data)=>{
        setHandleShowVideo(true)
        setLinkVideo(data.link_video)
    }

    // Clear State 
    const clearState = () =>{
        setJudul('');
        setKeterangan('');
        setLinkThumbnail('');
        setSaveLinkVideo('');
    }

    // Simpan Content
    const handleSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginAdmin');
        const Swal = require('sweetalert2')
        const dataSend ={
            judul: judul,
            keterangan: keterangan,
            link_thumbnail: link_thumbnail,
            link_video: link_video,
            token: token,
        }
        if(judul === '' || keterangan === '' || link_thumbnail === '' || link_video === ''){
            Swal.fire('Gagal', 'Form Harus Diisi Semua', 'error')
              return;
        }
        fetch(`${process.env.REACT_APP_API}/tambahContent`,{
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res=> res.json())
        .then(hasil => {
            console.log('hasil =>', hasil);
            setLgShow(false)
            clearState();
            if(hasil.status === 'berhasil'){
                Swal.fire('success', hasil.message, 'success')
                getData()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        })
    }

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
                    youtube:{
                        playerVars:{
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
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    <label htmlFor="judul">Judul</label>
                    <input type="text" name="judul" value={judul} className="form-control" placeholder="Judul" onChange={(e) => setJudul(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="keterangan">Keterangan</label>
                    <input type="text" name="keterangan" value={keterangan} className="form-control" placeholder="Keterangan" onChange={(e) => setKeterangan(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="link_thumbnail">Link Thumbnail</label>
                    <input type="text" name="link_thumbnail" value={link_thumbnail} className="form-control" placeholder="Link Thumbnail" onChange={(e) => setLinkThumbnail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="link_video">Link Video</label>
                    <input type="text" name="link_video" value={link_video} className="form-control" placeholder="Link Video" onChange={(e) => setSaveLinkVideo(e.target.value)} />
                </div>
                <button className="btn brn-primary" onClick={(e) => handleSimpan(e)}>Simpan</button>
            </form>
        </Modal.Body>
      </Modal>

        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <button className="btn btn-primary btn-lg" onClick={() => setLgShow(true)}> + Tambah Video</button>
            </p>
        </div>

        <div className="row justify-content-center">
            {
                dataListVideo.map((data , index) => {
                    return(
                        <div key={index} className="card m-3 col-md-4 col-lg" style={{width: '18rem', height: 'auto', border:'none'}}>
                        <img onClick={() => handleOpenVideo(data)}
                        className="card-img-top" src={data.link_thumbnail} alt="thumbnail" />
                        <div className="card-body">
                            <h5 className="card-title">{data.judul}</h5>
                            <p className="card-text">{data.keterangan}</p>
                            <a href={data.link_video} className="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                    )
                })
            }
        </div>
       
        </>
    )
}


export default ListVideoAdmin;