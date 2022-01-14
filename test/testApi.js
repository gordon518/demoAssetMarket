const supertest = require('supertest');
const should = require('should');
const async = require('async');
const app = require('../app');
const db=require('../sqlite/liteDb');

//test the restful API of /api/getNearestTower
var request=supertest(app);
db.query("select * from tower",[],function(ret1){
  if(!ret1.err) {
    db.query("select * from building",[],function(ret2){
      if(!ret2.err) {
        arBuilding=ret2.rows;
        arTower=ret1.rows;
        testEachBuilding(arBuilding, arTower);
      } else {
        console.log(ret2.err);
      }
    });
  } else {
    console.log(ret1.err);
  }
});

function testEachBuilding(arBuilding, arTower) {
  async.eachSeries(arBuilding,(item, callback) =>  { //for each item in the array of arBuilding
    console.log("call url=/api/getNearestTower?buildingId="+item.id);
    request.get('/api/getNearestTower?buildingId='+item.id).expect(200).then(response =>{
      let nearestTower=getNearestTowerByItration(item,arTower);
      response.body.point.x.should.equal(nearestTower.x);
      response.body.point.y.should.equal(nearestTower.y);
      if(response.body.point.id!=nearestTower.id)
        console.log("Building.idx="+response.body.point.idx+",BuildingId="+response.body.point.id+" and "+nearestTower.id+" have the same x,y");
      callback();
    });
  }, (err) => { //after all http url requests finished, then do this function
    if(err) {
      console.log(err);
    } else {
      console.log("test passed successfully!");
    }
    app.close();
  });
}

function getNearestTowerByItration(building, arTower) {
  let min=Number.MAX_SAFE_INTEGER;
  let nearestTower=null;
  for(let i=0;i<arTower.length;i++) {
    let tower=arTower[i];
    let distance=getDistance(building, tower);
    if(distance<min) {
      min=distance;
      nearestTower=tower;
    }
  }
  return(nearestTower);
}

const getDistance = (a, b) => {
	const xDiff = (a.x - b.x) ** 2
	const yDiff = (a.y - b.y) ** 2
	return Math.sqrt(xDiff + yDiff)
}
