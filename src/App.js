import React, { useState, useEffect } from 'react'
import {bindActionCreators} from 'redux'
import {useSelector, useDispatch} from 'react-redux'
import {actions} from './redux/actions'
import {Table, Space, notification} from 'antd'
import style from './css/App.css'
import {Loading} from './Loading'
import Modal from "./Modal";
import {get, post} from './fetch';

export default () => {

  //Use react hook to use data and actions in Redux data store
  const [isModal, setIsModal] = useState(false);
  const [buildingId, setBuildingId] = useState("");

  const dispatch = useDispatch();
  const list = useSelector(state => state.list);
  const isFetching = useSelector(state => state.isFetching);
  const setList = bindActionCreators(actions.setList,dispatch);
  const setFetch = bindActionCreators(actions.setFetch,dispatch);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    get('/getBuilding').then((response)=> {
      //props.setFetch(false);
      if(!response.err) {
        var ret=JSON.parse(response);
        setList(ret.rows);
      }
      else {
        console.log(response);
        notification['error']({message: response.err});
      }
    }).catch((error)=> {
      //props.setFetch(false);
      console.log(error);
      notification['error']({message: error});
    });
  }, [dispatch]);

  //define two variable to represent <input> object
  let searchID, searchName;

  //action handler for clicking serch button
  const onSearch = (e) => {
    //First spell param
    let id=searchID.value;
    let name=searchName.value;
    let param="";
    if(id && id.length>0) {
      param="?id="+id;
    }
    if(name && name.length>0) {
      if(param.length>0) {
        param+="&name="+name;
      } else {
        param="?name="+name;
      }
    }
    let sRequest="/getBuilding"+param;
    //Second call api at back-end
    get(sRequest).then((response)=> {
    //this.props.setFetch(false);
      if(!response.err) {
        var ret=JSON.parse(response);
        setList(ret.rows);
      }
      else {
        console.log(response);
        notification['error']({message: response.err});
      }
    }).catch((error)=> {
      //this.props.setFetch(false);
      console.log(error);
      notification['error']({message: error});
    });
  }

  const findTower = (id) => {
    setBuildingId(id);
    setIsModal(true);
  }

  //define columns for Table component
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id > b.id ? 1: -1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name>b.name? 1:-1,
    },
    {
      title: 'X Coordinate',
      dataIndex: 'x',
      key: 'x',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.x > b.x? 1:-1,
    },
    {
      title: 'Y Coordinate',
      dataIndex: 'y',
      key: 'y',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.y > b.y? 1:-1,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>findTower(record.id)}>Find Tower</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <table width="100%" border="0" cellSpacing="0" cellPadding="0" align="center" >
      <tr>
        <td align="center">
          <table border="0" cellPadding="0" cellSpacing="0" width="710" >
          <tr>
            <td>ID:<input type="text" name="searchID" size="10" ref={input => searchID = input} placeholder="Search by ID" /></td>                        
            <td>Building Name:<input type="text" name="searchName" size="20" ref={input => searchName = input} placeholder="Search by Nme" /></td>
            <td><input type="button" name="buttSearch" value="Search" onClick={onSearch} /></td>
          </tr>
          </table>
        </td>
      </tr>
      {list.length>0 &&
      <tr>
        <td align="center">
          <table border="0" cellPadding="0" cellSpacing="0" width="710" >
          <tr>
            <td>
              <Table columns={columns} dataSource={list} />
            </td>
          </tr>
          </table>
        </td>
      </tr>
      }
      </table>
      {isModal && <Modal setIsModal={setIsModal} buildingId={buildingId} />}
    </div>
  );
}
