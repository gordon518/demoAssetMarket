const path=require('path');

module.exports = {
	post: (req, res) => {
		req.session.userInfo = null;
		res.json({
			err: null,
			retInfo: {}
		})	
	}
};
