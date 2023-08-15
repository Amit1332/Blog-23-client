import React, { useState } from 'react'
import {CContainer, CRow ,CCard,CCol ,CCardBody,CForm ,CFormInput,CFormCheck,CFormLabel,CButton,CFormSelect} from '@coreui/react';
import Select from 'react-select'
const Auth = () => {

const [user,setUser]= useState({
    name:'',
    email:'',
    password:'',
    notice:{
    sms:false,
    mail:false,
    status:false
    },
    color:'',
    gender:'',
    state:[]    

})
    const handleOnChange = (event)=>{ 
        const { name, value, type, checked } = event.target;
      
           
    if (type === 'checkbox') {
        setUser((prevData) => ({
          ...prevData,
          notice: {
            ...prevData.notice,
            [name]: checked,
          },
        }));
      
      } 
      else if(type === 'radio'){
        setUser((prevData)=>({
             ...prevData,gender:event.target.value
        }))
      }
      else {
        setUser((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }


    }

    const handleMultiSelectChange = (state) => {
        setUser((prevData) => ({
          ...prevData,
         state,
        }));
      };

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const response = await fetch('/api/v1/auth/create',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            if(response.ok){
                alert('user created successfully')
                setUser({...user})
            }
            else{
                alert('something went wrong')
            }
        } catch (error) {
            console.log(error);
        }

    }


    const options = [
        { value: 'madhya pradesh', label: 'Madhya Pradesh' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Odissa', label: 'Odissa' },
        { value: 'Karnatka', label: 'Karnatka' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Chattisgarh', label: 'Chattisgarh' },

      ]

    
  return (
    <div>
<CContainer>
  <CRow>
  
    <CCol>
    <CCard style={{ width: '30rem' }}>
  <CCardBody>
  <CForm onSubmit={handleSubmit}>
  <CFormInput
    type="text"
    id="exampleFormControlInput1"
    label="Name"
    placeholder="name@example.com"
    text="Must be 8-20 characters long."
    aria-describedby="exampleFormControlInputHelpInline"
    name='name'
    value={user.name}
    onChange={handleOnChange}
  />

<CFormInput
    type="email"
    id="exampleFormControlInput1"
    label="Email"
    placeholder="name@example.com"
    text="type : example@gmail.com"
    aria-describedby="exampleFormControlInputHelpInline"
    name='email'
    value={user.email}
    onChange={handleOnChange}
  />
  <CFormInput
    type="text"
    id="exampleFormControlInput1"
    label="Pasword"
    placeholder="password"
    text="Must be 8-20 characters long."
    aria-describedby="exampleFormControlInputHelpInline"
    name='password'
    value={user.password}
    onChange={handleOnChange}
  />

<CFormLabel htmlFor="staticEmail2" >
     Notification
    </CFormLabel>
<CFormCheck id="flexCheckDefault" type='checkbox' label="sms"  name='sms'
    checked={user.notice.sms}
    onChange={handleOnChange}
    
    />
<CFormCheck id="flexCheckChecked" type='checkbox' label="mail"  name='mail'
    checked={user.notice.mail}
    onChange={handleOnChange}
     />
<CFormCheck id="flexCheckChecked" type='checkbox' label="status"
 name='status'
 checked={user.notice.status}
 onChange={handleOnChange}
 
/>

<CFormSelect size="sm" className="mb-3" aria-label="Small select example" name='color'  value={user.color} onChange={handleOnChange}>
  <option>Select</option>
  <option value="1">Primary</option>
  <option value="2">Secondary</option>
  <option value="3">Danger</option>
  <option value="3">Success</option>
  <option value="3">Warning</option>

</CFormSelect>


<CFormLabel htmlFor="staticEmail2" >
    Gender
</CFormLabel>
<CFormCheck type="radio" name="gender" id="flexRadioDefault1" label="Male" value='male' checked={user.gender==='male'} onChange={handleOnChange}/>
<CFormCheck type="radio" name="gender" id="flexRadioDefault2" label="Female" value='female' checked={user.gender==='female'} onChange={handleOnChange}/>




<Select options={options}  isMulti
value={user.selectedOptions}
onChange={handleMultiSelectChange}
    className="basic-multi-select"
    classNamePrefix="select"/>



<CButton color="primary" type='submit' size="sm">Submit</CButton>
</CForm>
  </CCardBody>
</CCard>
    </CCol>
  </CRow>
 
</CContainer>

    </div>
  )
}

export default Auth