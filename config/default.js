'use strict';

export default {
	port:8081,
	url:'mongodb://localhost:27017/api',
	session:{
		name:'SID',
		secret:'SID',
		cookie:{
			httpOnly:true,
			secure:false,
			maxAge:30*24*3600*1000
		}
	}
};