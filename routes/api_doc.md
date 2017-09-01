# Routers Document

**Catelog**

- views
- docs
- apis
- users
- edit

## views
---

1. login page;
2. user register;
3. documents page;
4. apis page;
5. editor page [doc || api];

---


> **Routes:** /views/login 

*Route used for login page.*

- Method: GET
- Content-type: text/html

> **Routes:** /views/register 

*Route used for user register.*

- Method: GET
- Content-type: text/html

> **Routes:** /views/docs

*Route used for docs list page.*

- Method: GET
- Content-type: text/html

> **Routes:** /views/doc/:id/apis

*Route for api showing list.*

- Method: GET
- Content-type: text/html

> **Routes:** /views/[doc|api]/:id/edit

*Route for editor*

- Method: GET
- Content-type: text/html

## docs

--- 

1. hot documents;
2. recent documents;
3. contributed documents;
4. create document;
5. delete document;

---

> **Routes:** /docs/hot

*Get the hotest documents info*

- Method: POST
- Content-type: text/html
- body: {
	page:{
		unit_num:<Number>,
		page_num:<Number>
	},
	last:{
		edit:<Number>,
		id:<String>
	}
}


> **Routes:** /docs/recent

> **Routes:** /docs/:uid/contributed

> **Routes:** /docs/:uid/create

> **Routes:** /docs/:uid/remove/:did

## apis

---

1. show apis list;
2. get api detail info;

---

> **Routes:** /apis/:did/list

> **Routes:** /apis/:aid/detail

> **Routes** /apis/:uid/remove/:aid


## users

---

1. user info;
2. register new user;
3. delete user;
4. update user info;

---

> **Routes:** /users/:uid/info

> **Routes:** /users/register

> **Routes:** /users/remove/:uid

> **Routes:** /users/update/:uid

## edit 

--- 

1. edit document with whole api information in it;
2. edit api in one document

---

> **Routes:** /edit/:uid/doc/:did

> **Routes:** /edit/:uid/api/:aid

## middleware

---

1. create log (related to [document | api] and user collection);
2. record to document id to user contributed list;
3. record target user to document contributor lsit;

>**Note:** 
- If the target is an api, log should record api id, however in User entity doc id should be used and contributor info should also be record to which document the target api belongs to;
- If the user already have contribution to the document, then step 2 and 3 should be ignore;

---

> **Routes:** /edit/:uid/doc/:did

> **Routes:** /edit/:uid/api/:aid

> **Routes** /apis/:uid/remove/:aid

> **Routes:** /docs/:uid/create

> **Routes:** /docs/:uid/remove/:did