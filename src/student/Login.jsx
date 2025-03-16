import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';  
import { Loginyup } from '../schemas/Loginyup';
import styles from '../assets/login.module.css';  

function Login() {
  const navigate = useNavigate();  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Loginyup,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://your-api-url/api/login', {
          email: values.email,
          password: values.password,
        });

        const { token, role } = response.data;
        if (token) {
          localStorage.setItem('token', token);

          if (role === 'teacher') {
            navigate('/teacher-panel');  
          } else {
            navigate('/student-panel'); 
          }
        }
      } catch (error) {
        console.error('Giriş sırasında hata oluştu:', error);
      }
    },
  });

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <h2 className={styles['login-title']}>Giriş Yap</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles['input-group']}>
            <input
              type="email"
              name="email"
              className={styles['input-field']}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <div className={styles['error-message']}>{formik.errors.email}</div>
            )}
          </div>

          <div className={styles['input-group']}>
            <input
              type="password"
              name="password"
              className={styles['input-field']}
              placeholder="Şifre"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <div className={styles['error-message']}>{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className={styles['submit-button']}>Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
