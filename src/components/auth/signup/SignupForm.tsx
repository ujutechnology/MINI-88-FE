import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useValid from '../../../hooks/useValid';
import AuthLayout from '../../../shared/util/ui/AuthLayout';
import Input from '../../../shared/util/ui/Input';
import { useSignupMutation } from '../../../store/slices/authSlice';
import SignupFooter from './SignupFooter';
import SignupInputs from './SignupInputs';


export interface FormValueTypes {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  job: string;
  age: number;
  profilePhoto: string;
}

const SignupForm = () => {
  const [totalValid,setTotalValid] = useState(false)
  const [createUser,{data:userData,isLoading,error,isError}] = useSignupMutation()
  const [formValue,setFormValue] = useState<FormValueTypes>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    job:'',
    age:0,
    profilePhoto: 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
  })
  const {validateEmail,validatePassword,validateJob,validateUsername,validatePasswordConfirm,validateAge} = useValid()
  const navigate = useNavigate()


  const changeHandler = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {currentTarget:{value,name}} = e;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  useEffect(() => {
    setTotalValid(
      validateEmail(formValue.email)
      && validatePassword(formValue.password)
      && validateJob(formValue.job)
      && validateUsername(formValue.name)
      && validatePasswordConfirm(formValue.passwordConfirm)
      && formValue.password === formValue.passwordConfirm
      && validateAge(formValue.age)
      )
  },[formValue])

  const registHandler = () => {
    
    createUser({
      email: formValue.email,
      name: formValue.name,
      job: formValue.job,
      age: formValue.age,
      password: formValue.password,
      profilePhoto:formValue.profilePhoto
    }).unwrap().then(() => {
      alert('??????????????? ?????????????????????. ????????? ???????????? ???????????????.')
      navigate('/signin')
    }).catch(() => {
      alert('??? ??? ?????? ????????? ?????? ??????????????? ?????????????????????.')
    })
    
  }
  console.log(document.cookie);
  
  return (
    <AuthLayout title="?????? ??????" description='?????? ????????? ??????????????????.'>
      <SignupInputs setTotalValid={setTotalValid} changeHandler={changeHandler} formValue={formValue} setFormValue={setFormValue} />
      <SignupFooter totalValid={totalValid} onClick={registHandler}/>
    </AuthLayout>
  );
};

export default SignupForm;