const db=require('../sqlite/liteDb');

module.exports = {
	get: (req, res) => {
		getTower(req, function(ret) {
			res.json(ret);
		});
	},
};

function getTower(req, fn) {
	const buildingId=req.query.buildingId;
	db.query("select * from building where id=?",[buildingId],function(ret1){
		if(!ret1.err) {
			if(ret1.rows.length==1) {
				let buildingRow=ret1.rows[0];
				const buildingPoint={x: buildingRow.x, y: buildingRow.y};
				db.query("select * from tower",[],function(ret2) {
					if(!ret2.err) {
						let arTower=ret2.rows;
						for(let i=0;i<arTower.length;i++) {
							let row=arTower[i];
							row.pos=[row.x, row.y]; //define position
							row.idx=i; //definde order No.
						}
						let point=findTower(buildingPoint, arTower);
						point.distance=getDistance(buildingPoint, point);
						fn({err:null, point:point});
					} else {
						fn({err: ret2.err});
					}
				}); 
			} else {
				fn({err:"Can't find building where id="+buildingId});
			}
		} else {
			fn({err: ret1.err});
		}
	});
}

function findTower(buildingPoint, arTower) {

	let towerSum=arTower.length;
	let demension=2;
	let variance=[];
	let split=[];
	let use=[];
	let buildingPos=[];
	let point={};
	let ans, idx;

	///////////translate from C/C++ STL library, the node at last position will be used, not like C/C++ which don't use the last node, only reach last-1.  
	function nth_element(arr, first, nth, last, cmp) {
		let mid = partation(arr, first, last, cmp);
		if ( mid == nth )
			return arr[mid];
		return ( mid < nth ) ? nth_element(arr, mid+1, nth, last, cmp) : nth_element(arr, first, nth, mid-1, cmp);
	}

	function partation(arr, first, last, cmp) {
		let mid = first - 1;
		for (let i = first; i <last; ++i) {
			if(cmp!=null) {
				if (cmp(arr[i],arr[last])) {
					mid++;
					swap(arr, i, mid);
				}
			} else {
				if (arr[i] < arr[last]) {
					mid++;
					swap(arr, i, mid);
				}
			}
		}
		mid++;
		swap(arr, mid, last);
		return mid;
	}

	function swap(arr, i, j) {
		let tempi = arr[i];
		arr[i]=arr[j];
		arr[j]=tempi;
	}
	/////////////End of Translate///////////////////
	function cmp(a, b) {
		return(a.pos[split[now]]<b.pos[split[now]]);
	}

	function buildKdTree(L, R) {
		if(L>R) return;
	 
		let mid=(L+R)>>1;
		
		//Find the variance over each dimension 
		for(let pos=0;pos<demension;pos++)
		{
			let i;
			let ave=variance[pos]=0.0;
			for(i=L;i<=R;i++)
				ave+=arTower[i].pos[pos];
			ave/=(R-L+1);
			for(i=L;i<=R;i++)
				variance[pos]+=(arTower[i].pos[pos]-ave)*(arTower[i].pos[pos]-ave);
			variance[pos]/=(R-L+1);
		}
		
		//Find the dimension for biggest variance, and use it as split dimension split_method
		split[now=mid]=0;
		for(let i=1;i<demension;i++)
			if(variance[split[mid]]<variance[i]) split[mid]=i;
		
		//fast sort by nth_element from C/C++ STL，find mid point
		nth_element(arTower, L, mid, R, cmp);
		//console.log("after nth_element,L="+L+",mid="+mid+",R="+R);
		//for(let i=L;i<=R;i++) {
		//	let o=arTower[i];
		//	console.log("idx="+o.idx+","+o.x+","+o.y);
		//}
		
		buildKdTree(L,mid-1);
		buildKdTree(mid+1,R);
	}

	function queryKdTree(L, R) {
		if(L>R) return;
		let mid=(L+R)>>1;
		
		//Get the distance from target buildingPos to node Tower
		let dis=0;
		for(let i=0;i<demension;i++)
			dis+=(buildingPos[i]-arTower[mid].pos[i])*(buildingPos[i]-arTower[mid].pos[i]);
		
		//if current node not used before, and dis < ans
		if(!use[arTower[mid].idx] && dis<ans)
		{
			ans=dis;  //update more near distance
			point=arTower[mid];  //update the point of near node
			idx=arTower[mid].idx;  //update more near idx
		}
		
		//Calculate distance from buildingPos split Tower
		let radius=(buildingPos[split[mid]]-arTower[mid].pos[split[mid]])*(buildingPos[split[mid]]-arTower[mid].pos[split[mid]]);
		
		//query sub region
		if(buildingPos[split[mid]]<arTower[mid].pos[split[mid]]) {
			queryKdTree(L,mid-1);
			if(radius<=ans)
				queryKdTree(mid+1,R);
		} else {
			queryKdTree(mid+1,R);
			if(radius<=ans)
				queryKdTree(L,mid-1);
		}
	}
	
	buildKdTree(0,towerSum-1);
	//console.log("after buildKdTree,L=0,R="+(towerSum-1));
	//for(let i=0;i<towerSum;i++) {
	//	let tower=arTower[i];
	//	console.log("idx="+tower.idx+","+tower.x+","+tower.y);
	//}
	let nearestSum=1;
	use.splice(0,use.length); //set null array
	buildingPos=[buildingPoint.x, buildingPoint.y];
	while(nearestSum--) {
		ans=Number.MAX_SAFE_INTEGER;
		queryKdTree(0,towerSum-1);
		console.log(point.pos[0]+","+point.pos[1]);
		use[idx]=1;
	}
	return(point);
}

const getDistance = (a, b) => {
	const xDiff = (a.x - b.x) ** 2
	const yDiff = (a.y - b.y) ** 2
	return Math.sqrt(xDiff + yDiff)
}