import React, { use } from 'react'

const UserData = () => {
    const [user,setuser]=useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token != null){
          axios.get(import.meta.env.VITE_API_URL+"/api/User/me",{headers:{
            Authorization:`Bearer ${token}`
  
          }}).then((res)=>{
            setuser(res.data)
          }).catch((err)=>{
            localStorage.removeItem("token") // if token is not valid
            setuser(null);
          })
        }
    },[])
  return (
    <div>UserData</div>
  )
}

export default UserData