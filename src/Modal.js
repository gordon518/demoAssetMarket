// @src/Modal.jsx

import React, {useEffect} from "react";
import {bindActionCreators} from 'redux'
import {useSelector, useDispatch} from 'react-redux'
import {actions} from './redux/actions'
import {notification} from 'antd'
import styles from "./css/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import {get, post} from './fetch';

export default (props) => {

  const dispatch = useDispatch();
  const tower = useSelector(state => state.tower);
  const setTower = bindActionCreators(actions.setTower,dispatch);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    get('/getNearestTower?buildingId='+props.buildingId).then((response)=> {
      //props.setFetch(false);
      if(!response.err) {
        var ret=JSON.parse(response);
        setTower(ret.point);
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

  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Nearest Tower</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => props.setIsModal(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {tower &&
            <table border="0" cellPadding="0" cellSpacing="0" width="345" >
              <tr>
                <td colspan="2">Distance: {tower.distance}</td>                        
              </tr>
              <tr>
                <td>ID: {tower.id}</td>                        
                <td>Name: {tower.name}</td>
              </tr>
              <tr>
                <td>X: {tower.x}</td>
                <td>Y: {tower.y}</td>
              </tr>  
            </table>
            }
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => props.setIsModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

