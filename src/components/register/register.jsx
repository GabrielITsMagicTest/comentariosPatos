import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import './register.css'
import { data, Link, useNavigate } from "react-router-dom"
import api from '../../services/api'
import { useState } from "react"

const schema = yup.object({
  username: yup.string().required("obrigatório o nome").min(5, "no mínimo 6 digitos"),
  password: yup.string().required("obrigatório a senha").min(6, "no mínino 6 digitos")
})

const Register = () => {

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
    api.addUser(data_form.username, data_form.password)
      .then(data_api => {
        if (Object.keys(data_api) != "error")
          navigate("/chat?user=" + data_api.user)
        else
          setError_Login(data_api.error)
      })
  }

  return (
    <div className="body-register">
      <div className="box-register">
        <form onSubmit={handleSubmit(submit)}>
          <h1>criar uma conta</h1>
          <input placeholder="username" {...register("username")} />
          <span>{errors.username?.message}</span>

          <input placeholder="password" {...register("password")} />
          <span>{errors.password?.message}</span>

          <Link className="login-link" to="/login">conecta-se</Link>
          <span className="register-error">{error_login}</span>
          <input value="registrar-se" type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Register