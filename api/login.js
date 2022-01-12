const db=require('../sqlite/liteDb');

module.exports = {
	post: (req, res) => {
		const {userName, password} = req.body;
		const session = req.session;
		checkPass(userName, password, function(ret) {
			if(!ret.err) {
				if(session) {
					if(session.userInfo) {
						res.json({err: "You are already logged in!"});
					}
					else {
						session.userInfo = {
							userName,
							password
						}
						res.json({
							err: null,
							retInfo: {}
						});
					}
				}
				else {
					res.json({err: "No session" });
				}
			} else {
				res.json(ret);
			}
		});
	}
};

function checkPass(userName, password, fn) {
	const sql="select * from user where username=? and password=?";
	db.query(sql,[userName, password],function(ret) {
		if(!ret.err) {
			if(ret.rows.length==1) {
				fn(ret);
			} else {
				ret.err="Username or password error";
				fn(ret);
			}
		} else {
			fn(ret);
		}
	});

}