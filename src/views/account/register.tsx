import { ReactNode, useState, useEffect } from "react";
import './login.css'
import LoginCard from "../../components/logincard/loginCard";
import { Formik, Form, Field, ErrorMessage, FieldProps, FormikValues } from 'formik'
import * as yup from 'yup'
import InputMask from "react-input-mask";
import { Request } from "../../utils/requests";
import ParamModel, { ParamType } from "../../models/paramsModel";
import { useDispatch, useSelector } from "react-redux";
import SessionState from "../../models/sessionModel";
import { updateSessionData } from "../../redux/sessionSlice";
import { updateRouteData } from "../../redux/routerSlice";
import { useNavigate } from 'react-router-dom';
class FormValues {
  constructor(cpf: string, password: string) {
    this.cpf = cpf
    this.password = password
  }
  cpf!: string;
  password!: string;
  confirmPassword!: string;
  email!: string;
  telefone!: string;
  name!: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const sessionData = useSelector((state: SessionState) => state);
  const navigate = useNavigate()


  const [form, setFormValues] = useState(new FormValues('', ''))
  const schema = yup.object({
    cpf: yup.string().test('cpf', 'O campo CPF é obrigatório', (value) => {
      console.log(value)

      if (value !== undefined) {
        const unmaskedValue = value?.replaceAll('.', '').replaceAll('-', '').replaceAll('_', '')

        return unmaskedValue?.length === 11
      } else return true
    }),
    password: yup.string().required('A Senha é obrigatório').oneOf([yup.ref('confirmPassword')], 'As senhas não são iguais'),
    confirmPassword: yup.string().required('A Senha é obrigatório').oneOf([yup.ref('password')], 'As senhas não são iguais'),
    email: yup.string().required('O campo Email é obrigatório'),
    telefone: yup.string().required('O campo Telefone é obrigatório'),
    name: yup.string().required('O campo Nome é obrigatório')
  })


  const handleGoToRegister = () => {
    navigate('/register')
  }

  const handleSubmit = async (values: FormValues, { setSubmitting, setFieldError }: any) => {
    console.log(values)
    setSubmitting(false)
    setFormValues(values)
    values.cpf = values.cpf.replaceAll('_', '').replaceAll('-', '').replaceAll('.', '')
    const params: ParamModel[] = [
      new ParamModel('teste', values, ParamType.BodyParam)
    ];
    try {
      const result = await Request('account/register', 'post', false, params)
      console.log(result);
      if (result.data.status === 'error') {
        if (result.data.message === 'validation errors') {
          let lista: string[] = result.data.validationErrors
          let validCPF: string[] = lista.filter(x => x.toLowerCase().includes('CPF'));
          let validPass: string[] = lista.filter(x => x.toLowerCase().includes('Senha'));
          let validEmail: string[] = lista.filter(x => x.toLowerCase().includes('Email'));
          let validNome: string[] = lista.filter(x => x.toLowerCase().includes('Nome'));



          if (validCPF.length > 0) {
            setFieldError('cpf', validCPF[0]);
          }

          
          if (validNome.length > 0) {
            setFieldError('cpf', validCPF[0]);
          }

          if (validEmail.length > 0) {
            setFieldError('email', validEmail[0]);
          }

          if (validPass.length > 0) {
            setFieldError('password', validPass[0]);
          };
        }
      } else if (result.data.status === 'success') {
        navigate('/login/success/Registrado com sucesso')
      }
    } catch (err) {
      console.log(err)
      setFieldError('password', 'Ocorreu um erro, tente novamente mais tarde');
    }
  }

  return (
    <div className="mainLoginDiv">
      <Formik
        initialValues={form}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <LoginCard style={{
              height: "600px"
            }}>
              <div className="formInputs">
                
                <div className="row">
                  <div className="card-group">
                    <label htmlFor="cpf" >CPF</label>
                    <Field name='cpf'>
                      {({ field }: FieldProps) => (
                        <InputMask {...field} id="cpf" type="text" mask={"999.999.999-99"} />
                      )}
                    </Field>
                    {errors.cpf && (
                      <span className="validation-error" >{errors.cpf}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="card-group">
                    <label htmlFor="name" >Nome</label>
                    <Field type="string" id="name" name="name" />
                    {errors.name && (
                      <span className="validation-error" >{errors.name}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="card-group">
                    <label htmlFor="telefone" >Telefone</label>
                    <Field name='telefone'>
                      {({ field }: FieldProps) => (
                        <InputMask {...field} id="telefone" type="text" mask={"(99) 99999-9999"} />
                      )}
                    </Field>
                    {errors.telefone && (
                      <span className="validation-error" >{errors.telefone}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="card-group">
                    <label htmlFor="email" >Email</label>
                    <Field name='email' id="email" type="text" />
                    {errors.email && (
                      <span className="validation-error" >{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="card-group">
                    <label htmlFor="password" >Senha</label>
                    <Field type="password" id="password" name="password" />
                    {errors.password && (
                      <span className="validation-error" >{errors.password}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="card-group">
                    <label htmlFor="confirmPassword" >Confirmar Senha</label>
                    <Field type="password" id="confirmPassword" name="confirmPassword" />
                    {errors.confirmPassword && (
                      <span className="validation-error" >{errors.confirmPassword}</span>
                    )}
                  </div>
                </div>
                <div style={{
                  justifyContent: 'center',
                }} className="row">
                  <button type="submit" disabled={isSubmitting} className="submitForm">Enviar</button>
                </div>

              </div>
            </LoginCard>
          </form>
        )}
      </Formik>
    </div >

  )
}


export default Register;