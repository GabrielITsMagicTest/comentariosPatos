import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import './login.css'
import { Link, useNavigate } from "react-router-dom"
const schema = yup.object({
  username: yup.string().required("obrigatório o nome"),
  password: yup.string().required("obrigatório a senha")
})

import api from '../../services/api'
import { useState } from "react"

const Login = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [error_login, setError_Login] = useState("")

  const navigate = useNavigate()

  const submit = (data_form) => {
    api.getUser(data_form.username, data_form.password)
      .then(data_api => {
        if (Object.keys(data_api) != "error")
          navigate("/chat?user=" + data_api.user)
        else
          setError_Login(data_api.error)
      })
  }

  return (
    <div className="body-login">
      <div className="box-login">
        <h1>entrar na conta</h1>
        <form onSubmit={handleSubmit(submit)}>
          <input placeholder="username" {...register("username")} />
          <span>{errors.username?.message}</span>

          <input placeholder="password" {...register("password")} />
          <span>{errors.password?.message}</span>

          <Link className="register-link" to="/register">registrar-se</Link>
          <span className="login-error">{error_login}</span>
          <input value="entrar" type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Login