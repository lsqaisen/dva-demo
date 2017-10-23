import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import { Loading } from '../components/Loading';
import './App.less';

const App = ({ loading, app, children, routes, params, dispatch, ...props }) => {
    const { profile, menudata } = app;
    const mainlayout = {
        profile,
        menudata,
        routes,
        params,
        dispatch,
    };
    return (
        <div>
            {!profile ? <div>
                {loading.effects['app/profile'] ? <Loading loading={loading.models.app} /> : children}
            </div> : <MainLayout {...mainlayout}>
                    {children}
                </MainLayout>}
        </div>
    )
}

export default connect(props => props)(App);
