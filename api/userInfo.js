const path=require('path');

module.exports = {
	get: (req, res) => {
		const session = req.session;
		//console.log(session.userInfo);
		if(session.userInfo) {
			res.json({
				err: null,
				userInfo: session.userInfo
			})
		}
		else
		{
			res.json({
				err: null,
				userInfo: {}
			})
		}	
	},
};
