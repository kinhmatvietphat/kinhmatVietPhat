import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({name:'', price:0, description:'', image:''});

  useEffect(() => {
    fetch("/products").then(res=>res.json()).then(setProducts);
  }, []);

  const addProduct = () => {
    fetch("/products", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(form),
    }).then(()=>window.location.reload());
  };

  return (
    <div>
      <h1>Kính Mắt Việt Phát - Quản lý sản phẩm</h1>

      <div>
        <input placeholder="Tên sản phẩm" onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Giá VNĐ" onChange={e=>setForm({...form, price:+e.target.value})}/>
        <textarea placeholder="Mô tả" onChange={e=>setForm({...form, description:e.target.value})}/>
        <input placeholder="Link ảnh" onChange={e=>setForm({...form, image:e.target.value})}/>
        <button onClick={addProduct}>Thêm sản phẩm</button>
      </div>

      <div>
        {products.map(p=>(
          <div key={p.id}>
            <img src={p.image} width="100"/>
            <h3>{p.name}</h3>
            <p>{p.price} VNĐ</p>
            <p>{p.description}</p>

            <img src={`/product/${p.id}/qr`} width="150"/>
            <button onClick={()=>navigator.clipboard.writeText(`https://kinhmatvietphat.com/product/${p.id}`)}>
              Copy link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
