import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Alert } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

import { required, min, confirm, isEmail } from 'utils/inputValidate'

const RegisterForm = ({
  hasError,
  isLoading,
  className,
  onSubmit,
  clearError
}) => (
  <Form
    name='register-form'
    className={cn('auth-form', className)}
    onFinish={onSubmit}
    size='large'
  >
    {hasError && (
      <Form.Item>
        <Alert
          message={'Aкаунт с таким E-mail уже существует'}
          type='error'
          showIcon
        />
      </Form.Item>
    )}

    <Form.Item
      name='email'
      rules={[
        required('Введите пожалуста ваш email!'),
        isEmail('Введите коректный E-mail')
      ]}
    >
      <Input prefix={<MailOutlined />} type='email' placeholder='E-mail' />
    </Form.Item>
    <Form.Item
      name='password'
      hasFeedback
      rules={[
        required('Введите пожалуста ваш пароль!'),
        min(6, 'Минимум 6 символов')
      ]}
    >
      <Input.Password
        prefix={<LockOutlined />}
        type='password'
        placeholder='Пароль'
      />
    </Form.Item>

    <Form.Item
      name='re-password'
      hasFeedback
      rules={[
        required('Повторите пожалуста ваш пароль!'),
        confirm('password', 'Пароли не совпадаю')
      ]}
    >
      <Input.Password
        prefix={<LockOutlined />}
        type='password'
        placeholder='Повторите пароль'
      />
    </Form.Item>

    <Form.Item>
      <Button type='primary' htmlType='submit' loading={isLoading}>
        Зарегистрироваться
      </Button>
    </Form.Item>
    <Link to='/login' onClick={clearError}>
      <Button type='link'>Есть аккаунт</Button>
    </Link>
  </Form>
)

export default RegisterForm