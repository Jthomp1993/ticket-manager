import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData;
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

        // Redirect when logged in
        if(isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2) {
            toast.error('Passwords do not match!');
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData));
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name='name' id='name' value={name} onChange={onChange} placeholder='Full Name' required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name='email' id='email' value={email} onChange={onChange} placeholder='Email' required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name='password' id='password' value={password} onChange={onChange} placeholder='Password' required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name='password2' id='password2' value={password2} onChange={onChange} placeholder='Confirm Password' required/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
