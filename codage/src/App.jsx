import { useEffect, useState } from 'react'
import './App.css'
import data from "../e-commerce.json"

function App() {
  const [products, Setproducts] = useState([])
  const [brand, Setbrand] = useState('')
  const [category, Setcategory] = useState('')
  const [range,Setrange]=useState([0,1000])

  const filteredProducts = products.filter((pro) => {
    const brandMatch = brand ? pro.brand === brand : true;
    const sellMatch = pro.price ? (pro.price >= range[0] && pro.price <= range[1]) : true;
    const categoryMatch = category ? pro.category === category : true;
    return brandMatch && sellMatch && categoryMatch;
});
  useEffect(() => {
    if (data.products) {
      Setproducts(data.products) 
    }
  }, [])

  const uniqueCategories = [...new Set(products.map((product) => product.category))]

  const onclick = () => {
    console.log(products)
  }
  return (
    <div className=''>
      <div className='w-full flex h-20 border-2 border-fray-500 bg-white p-2'>
        <select
          value={brand}
          onChange={(e) => Setbrand(e.target.value)}
          className="p-3 border bg-gray-300 w-40 ml-10 text-md text-green-600 border-gray-800 rounded-lg"
        >
          <option value="">All Brands</option>
          {products.map((product, index) => (
            <option key={index} value={product.brand}>
              {product.brand}
            </option>
          ))}
        </select>
        
        {/* <button onClick={onclick}>click</button> */}
        <select
          value={category}
          onChange={(e) => Setcategory(e.target.value)}
          className="p-3 border ml-4 bg-gray-300 w-40 text-md text-green-600 border-gray-800 rounded-lg"
        >
          <option value="">All Category</option>
          {uniqueCategories.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>

<div className='bg-gray-300 ml-5 w-2/3'>
  <label className="text-gray-700 font-semibold ml-4">Price Range: ₹{range[0]} - ₹{range[1]}</label>
<input 
    type="range" 
    min="0" max="1000" 
    value={range[1]} 
    onChange={(e) => Setrange([0, parseInt(e.target.value)])} 
    className="mt-2 w-1/3 ml-4"
/>
</div>
      </div>

      <div className='grid grid-cols-4  mt-2 bg-white w-full'>
      {filteredProducts.map((product, index) => (
            <div className='h-120 w-80 bg-gray-100/ ml-4 mt-5 rounded-2xl  border-2 border-black' >
             <h1 className='ml-4 text-lg font-bold text-blue-800'> {product.title} </h1>
             <img 
          src={product.images} 
         alt="image" 
          className="w-full h-70 object-cover rounded-t-2xl "
          />
          {product.tags.map((tag,index)=>(
            <span className='ml-2 gap-10 p-1 rounded-2xl bg-green-500/50'>{tag}</span>
          ))}
          <div className='mt-2 ml-2 bg-yellow-400 w-75 p-1 rounded-2xl'>
            <span className='ml-22 text-2xl text-red-600 '>Price : {product.price}</span></div>
          <div className='mt-2'>
            <span className='ml-2 p-1 text-sm rounded-2xl bg-red-500/50'>Category : {product.category}</span>
            <span className='ml-2 p-1  text-sm rounded-2xl bg-red-500/50'>Brand : {product.brand}</span>
          </div>
         <div className='mt-2 ml-2'>
          <p className='truncate'>{product.description}</p>
         </div>
            </div>
          ))}
      </div>
 

    </div>
  )
}

export default App
