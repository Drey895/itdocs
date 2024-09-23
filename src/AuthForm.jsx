'use client'

import { useState, useRef, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { Input } from './components/Input';
import { getData } from './getData';

const AuthForm = ({sw}) => {
    // const [isRegistering, setIsRegistering] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const pwdRef = useRef(null)
    const { ref, ...rest } = register("password")
    
    return (
      <div>
        <h2 className='text-2xl text-center'>{'Система авторизации'}</h2>
        <form action={getData} className={"w-[300px]"}>
          { (
            <div className='flex flex-col gap-2.5 py-5'>
              <label htmlFor="name">Логин:</label>
              <Input s={register("name")}/>
              <label htmlFor="password">Пароль:</label>
              <Input s={{...rest, ref: pwdRef, type: "password", required: true }}/>
              
            </div>
          )}
          <div className='flex flex-col gap-2 items-center'>
           <button type="button" className=' py-2 px-5 bg-blue-200 rounded hover:bg-blue-300 transition ease-in-out' onClick={(e) => {
            if ( pwdRef.current && pwdRef?.current?.type == "password") {
                pwdRef.current.type = "text"
            }
            else if (pwdRef.current && pwdRef?.current?.type == "text") {
                    pwdRef.current.type = "password"
            }

           }}>{ 'Скрыть'}</button>
            <button type="submit" className=' py-2 px-5 bg-green-200 rounded hover:bg-green-300 transition ease-in-out'>{ 'Войти'}</button>
            <button type="button" className='py-2 px-5 bg-red-200 rounded hover:bg-red-300 transition ease-in-out' onClick={sw}>{ 'Регистрация'}</button>
            </div>
            </form>
         
      </div>
    );
  };
  
  export default AuthForm;