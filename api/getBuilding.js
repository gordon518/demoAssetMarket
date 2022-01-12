const db=require('../sqlite/liteDb');

module.exports = {
	get: (req, res) => {
		searchBuilding(req, function(ret) {
			res.json(ret);
		});
	},
};

function searchBuilding(req, fn) {
	let id=req.query.id;
	let name=req.query.name;
	let swhere="";
	let param=[];
	if(id && id.length>0) {
		swhere=" where id=?";
		param.push(id);
	}
	if(name && name.length>0) {
		if(swhere.length>0) {
			swhere+=" and ";
		} else {
			swhere+=" where ";
		}		
		swhere+="name like ?";
		param.push("%"+name+"%");
	}
	let sql="select * from building"+swhere;
	db.query(sql,param,function(ret){
		fn(ret);
	});

}