import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Skor = () => {
    const navigate = useNavigate();
    const [skor, setSkor] = useState([]);

    useEffect(()=>{
        getNilai();
    },[])

    const getNilai = () => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend= {
            token
        }
        fetch(`${process.env.REACT_APP_API}/hitungSkor`,{
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
                "Content-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then(hasil => {
            // console.log(hasil)

            if(hasil.status === 'gagal'){
                navigate('/');
                return
            }
            setSkor(hasil)
        })
    }

    const handleCobaLagi= () => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend ={
            token
        }
        fetch(`${process.env.REACT_APP_API}/selesaiUjian`,{
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
                "Content-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then(hasil => {
            if(hasil.status === 'berhasil'){
                navigate('/quiz');
                return
            }else{
                navigate('/',{replace:true});
                return
            }
        })
        .catch(err => {
            alert(err)
        })
    }
return(
    <>
    <div className="card" style={{marginLeft:'auto', marginRight:'auto'}}>
        <div className="card-content" style={{padding:94}}>
            <div className="content text-center text-black">
                <h3>Nilai Yang Kamu Peroleh</h3>
                <h1>{(skor.skor?skor.skor : null) * 10}</h1>
                <button className="btn btn-info mt-2" onClick={() => handleCobaLagi()}>Coba Lagi</button>
            </div>
            
        </div>
        
    </div>
    </>
)

}

export default Skor;