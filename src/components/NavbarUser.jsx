import React, { useState } from 'react'
import cn from 'classnames'
import { Menu, Dropdown, Avatar, Modal } from 'antd'

import {
  SettingOutlinedIcon,
  ExclamationCircleOutlinedIcon,
  LogoutOutlinedIcon
} from 'icons'
import { EditProfileForm } from 'containers'
import 'styles/components/NavbarUser.sass'

export const NavbarUser = ({ user, className, logout }) => {
  const [showForm, setShowForm] = useState(false)

  const toggleShowForm = () => setShowForm(!showForm)

  const logoutModal = () => {
    Modal.confirm({
      title: 'Вы действительно хотите выйти?',
      icon: <ExclamationCircleOutlinedIcon />,
      okText: 'Да',
      cancelText: 'Отменить',
      onOk() {
        logout()
      }
    })
  }

  const userMenu = () => (
    <Menu>
      <Menu.Item onClick={toggleShowForm}>
        <SettingOutlinedIcon />
        <span>Настройки профиля</span>
      </Menu.Item>
      <Menu.Item onClick={logoutModal}>
        <LogoutOutlinedIcon />
        <span>Выйти из аккаунта</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={cn('navbar-user', className)}>
      <Dropdown overlay={userMenu}>
        <Avatar
          size='large'
          src={user.photoURL}
          className='navbar-user__avatar'
        >
          {user.displayName ? user.displayName[0] : user.email[0]}
        </Avatar>
      </Dropdown>
      <div className='navbar-user__info'>
        {user.displayName && (
          <span className='navbar-user__nickname'>{user.displayName}</span>
        )}
        <span className='navbar-user__email'>{user.email}</span>
      </div>
      <EditProfileForm visible={showForm} toggleShowForm={toggleShowForm} />
    </div>
  )
}