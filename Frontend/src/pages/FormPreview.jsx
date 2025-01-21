import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstace from '../axios/axios'
import { useSelector } from 'react-redux'

const FormPreview = () => {
      const user =  useSelector((state) => state.user)
      const navigate = useNavigate()
      const [form,setForm] = useState()
      const [formValue,setFormValue] = useState()
      const [loading,setLoading] = useState(true)
      const {id} = useParams()

      const fetchEventForm = async()=>{
         try {
              const {data} =  await axiosInstace.get("/form/findOne",{
                params:{formId:id},
                headers: { authorization: `Bearer ${user?.token}` },
              })
              console.log(data);
              setForm(data.form)
              setLoading(false)
         } catch (error) {
             setLoading(false)
             console.log(error.message);
         }
      }

      const handleChange = (e)=>{
          const {name,value} = e.target;  
          console.log(e.target.value);
          setFormValue((pre)=> ({...pre,[name]:value}))
      }

      const handleSubmit = async()=>{
          try {
                const response =  await axiosInstace.post("/registeration/register",formValue,{
                    headers: { authorization: `Bearer ${user?.token}`},
                })    
                 console.log(response);
                 
                 navigate("/")

            } catch (error) {
                console.log(error.message);
            }
      }

      useEffect(()=>{
           fetchEventForm()
      },[id])

   if(loading){
       return <div>Loaing ...</div>
   }

  return (
    <div className="h-full flex items-center w-full  justify-center pt-[150px]">
    <div className="min-w-[600px] shadow-lg rounded-md m-4 p-4 flex flex-col items-center  ">
      {form && form.length
        ? form.map((field) => {
            return field.type === "radio" || field.type === "checkbox" ? (
              <div className=" ">
                {field?.title?.length ? <h2>{field.title}</h2> : ""}
                <div className="flex   max-w-[90px] justify-between items-center">
                  <label
                    className="text-md mt-1 font-md text-gray-600"
                    htmlFor={field.name}
                  >
                    {field.name} *
                  </label>
                  <input
                    onChange={handleChange}
                    name={field.name}
                    id={field.name}
                    className=" rounded-md bg-gray-200"
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-2">
                <label
                  className="text-md mt-1 font-md text-gray-600"
                  htmlFor=""
                >
                  {field.name} *
                </label>
                <input
                  onChange={handleChange}
                  name={field.name}
                  className="w-[100%] py-4 p-1 rounded-md bg-gray-200"
                  placeholder={field.placeholder}
                  type={field.type}
                />
              </div>
            );
          })
        : ""}
        <button type='button' onClick={handleSubmit} className='bg-green-500 py-2 px-10 rounded-md text-white mt-3'>
            Submit
        </button>
    </div>
  </div>
  )
}

export default FormPreview
 