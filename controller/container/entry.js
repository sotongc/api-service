'use strict';

import path from "path";

class Entry{
	constructor(){
		this.root=path.resolve(__dirname,"../../views/");
		this.dotfiles='deny';
		this.headers={
			"Content-type":"text/html"
		};

		this.__proto__.home=this.home.bind(this);
		this.__proto__.document=this.document.bind(this);
	}
	home(req,res,next){
		res.status(200);
		res.type("html");
		res.sendFile('home.html',{
			root:this.root,
			dotfiles:this.dotfiles,
			headers:this.headers
		},(err)=>{
			err && res.status(err.status).end();
		});
	}
	document(req,res,next){
		console.log(req.params.id);
		res.status(200);
		res.type("html");
		res.sendFile('document.html',{
			root:this.root,
			dotfiles:this.dotfiles,
			headers:this.headers
		},(err)=>{
			err && res.status(err.status).end();
		});
	}
}

export default new Entry();