import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import llamaCool from "../../assets/img/llama-cool.webp";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../store/authStore";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await signIn(data.email, data.password);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Error al iniciar sesión");
        setLoading(false);
      }
    }, 3000);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    return () => setLoading(false);
  }, [user]);

  return (
    <div className='general-container'>
      <Image src={llamaCool} alt='Llama Cool' style={{ height: "350px" }} />
      <h1 className='login-header'>Inicia Sesión a Llama Cool</h1>
      {loading ? (
        <Loading />
      ) : (
        <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder='Email'
            type='text'
            name='email'
            register={register}
            validation={{ required: true, pattern: /^\S+@\S+$/i }}
            error={errors.Email}
          />
          <Input
            placeholder='Contraseña'
            type='password'
            name='password'
            register={register}
            validation={{ required: true, minLength: 8 }}
            error={errors.Password}
          />
          <Button type='submit' text='Iniciar Sesión' size='large-button' />
          <Link to='/register' className='link'>
            ¿No tienes cuenta? Regístrate
          </Link>
        </form>
      )}
    </div>
  );
};

export default Login;
