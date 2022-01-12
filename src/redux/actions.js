import * as acttype from './action-type'

export const actions = {
  // save userinfo
  saveUserInfo: function(userInfo) {
    return {
      type: acttype.SAVE_USERINFO,
      userInfo
    };
  },
  // modify userInfo
  modifyUserInfo: function(key, value) {
    return {
      type: acttype.MODIFY_USERINFO,
      key,
      value
    };
  },
  // Modify Attr Info
  saveAttrInfo: function(datatype, value) {
    return {
      type: acttype.SAVE_ATTRINFO,
      datatype,
      value
    };
  },
  // Set Fetch Flag
  setFetch: function(isFetching) {
    return {
      type: acttype.SET_FETCH,
      isFetching
    };
  },
  // Set list
  setList: function(list) {
    return {
      type: acttype.SET_LIST,
      list
    };
  },
  // set tower
  setTower: function(tower) {
    return {
      type: acttype.SET_TOWER,
      tower
    };
  },
}

