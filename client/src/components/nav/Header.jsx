import React, { useState } from 'react';
import { Badge, Menu } from 'antd';
import {
    WindowsOutlined, SettingOutlined, UserOutlined,
    UserAddOutlined, LogoutOutlined, ShoppingOutlined, ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import Search from '../forms/Search';

const Header = () => {
    const [current, setCurrent] = useState("home")

    const { user, cart } = useSelector(state => state)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = async () => {
        await firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: {}
        })
        history.push("/login")
    }

    const { SubMenu, Item } = Menu

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<WindowsOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>Cart</Badge>
                </Link>
            </Item>

            {!user.token && (
                <>
                    <Item key="register" icon={<UserAddOutlined />} className="float-right">
                        <Link to="/register">Register</Link>
                    </Item>

                    <Item key="login" icon={<UserOutlined />} className="float-right">
                        <Link to="/login">Login</Link>
                    </Item>
                </>
            )}

            {user.token && (
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title={user && user.name}
                    className="float-right"
                >
                    {user && user.role === 'subscriber' && (
                        <Item><Link to="/user/history">Dashboard</Link></Item>
                    )}
                    {user && user.role === 'admin' && (
                        <Item><Link to="/admin/dashboard">Dashboard</Link></Item>
                    )}
                    <Item icon={<LogoutOutlined />} onClick={logout}>Log out</Item>
                </SubMenu>
            )}

            <Search />
        </Menu>
    )
}

export default Header;
