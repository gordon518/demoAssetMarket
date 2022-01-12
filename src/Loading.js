import React from 'react'
import { Spin } from 'antd';
import style from './css/Loading.css'
export const Loading=()=>(
    <div className={style.container}>
        <Spin size="large"/>
    </div>
);