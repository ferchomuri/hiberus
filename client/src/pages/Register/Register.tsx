import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import llamaCool from "../../assets/img/llama-cool.webp";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../store/authStore";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await registerUser(data.fullName, data.email, data.password);
        setLoading(false);
        navigate("/login");
      } catch (error: unknown) {
        console.error("Error al registrar usuario");
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className='general-container'>
      <Image src={llamaCool} alt='Llama Cool' style={{ height: "350px" }} />
      <h1 className='register-header'>Regístrate a Llama Cool</h1>
      {loading ? (
        <Loading />
      ) : (
        <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder='Nombre Completo'
            type='text'
            name='fullName'
            register={register}
            validation={{ required: true }}
            error={errors.fullName}
          />
          <Input
            placeholder='Email'
            type='text'
            name='email'
            register={register}
            validation={{ required: true, pattern: /^\S+@\S+$/i }}
            error={errors.email}
          />
          <Input
            placeholder='Contraseña'
            type='password'
            name='password'
            register={register}
            validation={{ required: true, minLength: 8 }}
            error={errors.password}
          />
          <Button type='submit' text='Registrarse' size='large-button' />
          <Link to='/login' className='link'>
            Ya tienes cuenta? Inicia Sesión
          </Link>
        </form>
      )}
    </div>
  );
};

export default Register;
