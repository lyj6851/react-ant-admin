import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom'
import { getPageTitle } from '../router/utils';
import routes, { IRoute } from '../router/config'
import './userLayout.less'

import { Spin, Result, Button, Layout, Typography } from 'antd';
import logo from '../assets/logo.svg';


interface UserLayoutState {
  isError: boolean
}


class UserLayout extends React.PureComponent<any, UserLayoutState> {


  state: UserLayoutState = {
    isError: false
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch () {
    // 上报错误
  }

  render () {

    if (this.state.isError) {
      return (
        <Result
          status="warning"
          title="系统错误，请联系管理员"
          extra={
            <Button type="primary" key="console">
              Go Contact
            </Button>
          }
        />
      )
    }

    const title = getPageTitle()

    const route: IRoute | undefined = routes.find(route => route.path === '/system-user')

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className='container'>
          <div className='content'>
            <div className='top'>
              <Typography.Title className='header'>
                <Link to="/">
                  <img alt="logo" className='logo' src={logo} />

                  <span className='title'> Iny  Ant Admin </span>
                </Link>
              </Typography.Title>
              <div className='desc'>Iny Admin 是 Admin 这条街最靓的仔</div>
            </div>
            <Suspense fallback={<Spin />}>
              <Switch>
                {
                  route && route.children && route.children.map((menu: IRoute) => (
                    
                    <Route key={menu.path} path={menu.path} component={menu.component}></Route>
                  ))
                }
              </Switch>
            </Suspense>
          </div>
          <Layout.Footer style={{ textAlign: "center" }}>
            Iny-Admin 是 Admin 这条街最靓的仔
          </Layout.Footer>
        </div>   
      </>
    )
  }
}



export default UserLayout