'use strict';

import path from "path";

class Views{
	constructor(){
		this.root=path.resolve(__dirname,"../../views/");
		this.dotfiles='deny';
		this.headers={
			"Content-type":"text/html"
		};

		["login","register","docs","apis","edit"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	/*view router handlers*/
	login(req,res,next){
		res.status(200);
		res.type("html");
		res.sendFile("login.html",this.fileOpt(),function(err){
			err && res.status(err.status).end();
		});
	}
	register(req,res,next){
		res.status(200);
		res.type("html");
		res.sendFile("register.html",this.fileOpt(),function(err){
			err && res.status(err.status).end();
		});
	}
	docs(req,res,next){
		res.status(200);
		res.type("html");
		res.sendFile("docs.html",this.fileOpt(),function(err){
			err && res.status(err.status).end();
		});
	}
	apis(req,res,next){
		res.status(200);
		res.type("html");
		res.sendFile("apis.html",this.fileOpt(),function(err){
			err && res.status(err.status).end();
		});
	}
	edit(req,res,next){
		res.status(200);
		res.type("html");
		res.sendFile("edit.html",this.fileOpt(),function(err){
			err && res.status(err.status).end();
		});
	}
	/*assistence funcs*/
	fileOpt(){
		return {
			root:this.root,
			dotfiles:this.dotfiles,
			headers:this.headers
		};
	}
};

export default new Views();