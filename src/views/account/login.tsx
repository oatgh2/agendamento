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
import { useNavigate, useParams } from 'react-router-dom';
class FormValues {
    constructor(cpf: string, password: string) {
        this.cpf = cpf
        this.password = password
    }
    cpf!: string;
    password!: string;
}

const Login = (props: any) => {
    const dispatch = useDispatch();
    const sessionData = useSelector((state: SessionState) => state);
    const navigate = useNavigate()
    const { msg, type } = useParams();

    const [form, setFormValues] = useState(new FormValues('', ''))
    const [schemaValidation, setSchemaValidation] = useState(yup.object({
        cpf: yup.string().test('cpf', 'O campo CPF é obrigatório', (value) => {
            console.log(value)

            if (value !== undefined) {
                const unmaskedValue = value?.replaceAll('.', '').replaceAll('-', '').replaceAll('_', '')

                return unmaskedValue?.length === 11
            } else return true
        }),
        password: yup.string().required('A Senha é obrigatória')
    }));


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
            const result = await Request('account/login', 'post', false, params)
            console.log(result);
            if (result.data.status === 'error') {
                if (result.data.message === 'validation errors') {
                    let lista: string[] = result.data.validationErrors
                    let validCPF: string[] = lista.filter(x => x.includes('CPF'));
                    let validPass: string[] = lista.filter(x => x.includes('Senha'));

                    if (validCPF.length > 0) {
                        setFieldError('cpf', validCPF[0]);
                    }

                    if (validPass.length > 0) {
                        setFieldError('password', validPass[0]);
                    };
                }
            } else if (result.data.status === 'success') {
                dispatch(updateSessionData(result.data.user))
                navigate('/home')
            }
        } catch (err) {
            console.log(err)
            setFieldError('confirmPassword', 'Ocorreu um erro, tente novamente mais tarde');
        }
    }

    return (
        <div className="mainLoginDiv">
            <Formik
                initialValues={form}
                onSubmit={handleSubmit}
                validationSchema={schemaValidation}
            >
                {({ errors, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <LoginCard>

                            <div className="formInputs">
                                <div className="row">
                                    {msg &&(
                                        <span className={type}>{msg}</span>
                                    )}
                                </div>
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
                                        <label htmlFor="password" >Senha</label>
                                        <Field type="password" id="password" name="password" />
                                        {errors.password && (
                                            <span className="validation-error" >{errors.password}</span>
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    justifyContent: 'center',
                                }} className="row">
                                    <button type="submit" disabled={isSubmitting} className="submitForm">Logar</button>
                                </div>
                                <div className="row">
                                    <button type="button" onClick={handleGoToRegister} className="submitForm">Registrar</button>
                                </div>
                            </div>
                        </LoginCard>
                    </form>
                )}
            </Formik>
        </div >

    )
}


export default Login;