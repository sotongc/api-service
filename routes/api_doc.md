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

> **Routes:** /docs/recent

> **Routes:** /docs/:uid/contributed

> **Routes:** /docs/:uid/create

> **Routes:** /docs/:uid/delete

## apis

---

1. show apis list;
2. get api detail info;

---

> **Routes:** /apis/:did/list

> **Routes:** /apis/:aid/detail


## users

---

1. user info;
2. register new user;
3. delete user;
4. update user info;

---

> **Routes:** /users/:uid/info

> **Routes:** /users/register

> **Routes:** /users/:uid/remove

> **Routes:** /users/:uid/update

## edit 

--- 

1. edit document with whole api information in it;
2. edit api in one document

---

> **Routes:** /edit/doc/:did

> **Routes:** /edit/api/:aid
