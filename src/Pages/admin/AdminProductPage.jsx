import axios from 'axios';
import React, { useState } from 'react'

const AdminProductPage = () => {



const [product,setProduct] = useState([]);

    axios.get(import.meta.env.VITE_API_URL+"/api/Product").then(
        (response)=>{
            console.log(response.data);
            setProduct(response.data);
        }
    )
    console.log(product);

  return (
    <div className='w-full h-full p-[10px]'>

    <table className='border w-full text-center'>
        <thead>
            <tr>
                <th>Image</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Labelled Price</th>
                <th>Catagory</th>
                
            </tr>

        </thead>
        <tbody>
             {
        product.map(
            (item)=>{  //run this function for all data in arry
                console.log(item);
                return <tr key={item.productId}>
                <td>
                    <img src={item.images[0]} className='w-16 h-16 object-fit-cover' />
                </td>
                <td>
                    {item.productId}
                </td>
                <td>
                    {item.name}
                </td>
                <td>{item.price}</td>
                <td>{item.labeledPrice}</td>
                <td>{item.catagory}</td>
            </tr>
            }
        )
     }

        </tbody>

    </table>
    

    </div>
  )
}

export default AdminProductPage