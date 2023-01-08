import { useEffect, useState } from "react";

const ListVideoAdmin = () => {
    const [dataListVideo, setDataListVideo] = useState([]);
    useEffect(()=>{
        getData()
    },[]) // biar g muncul terus pas di tambahin array kosong

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
        })
    }
    return(
        <>
        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="/" role="button">Learn more</a>
            </p>
        </div>

        <div className="row justify-content-center">
            {
                dataListVideo.map((data , index) => {
                    console.log(data)
                    return(
                        <div key={index} className="card m-3 col-md-4 col-lg" style={{width: '18rem', height: 'auto', border:'none'}}>
                        <img className="card-img-top" src={data.link_thumbnail} alt="thumbnail" />
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