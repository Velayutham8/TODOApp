# TODOApp

# Instruction to start the local server

1. open terminal on following path named (server-side-api)
2. run the command 'npm i --save' and then 'tsc -w'
3. open another terminal and run this command to start the server 'npm run server'

# Database

* Online Mongodb cluster is running, so need to start local db server.

# Auth api paths (All 3 -  METHODS = Post)

* Signup - 'http://localhost:3000/api/v1/auth/signup' - Body = {username, password} (JSON)
* Signin - 'http://localhost:3000/api/v1/auth/signin' - Body = {username, password} (JSON)
* Refresh - 'http://localhost:3000/api/v1/auth/refresh' - Body = {accountid} (JSON)

## Todo api paths

* Create - 'http://localhost:3000/api/v1/todo/create' - Method => Post  - Body = {todo} (JSON)
* Update - 'http://localhost:3000/api/v1/todo/update' - Method => Post  - Body = {id, todo} (JSON)
* Delete - 'http://localhost:3000/api/v1/todo/delete' - Method => Delete - params = {id}
* View - 'http://localhost:3000/api/v1/todo/view' - Method => Get - params = {id}
* List - 'http://localhost:3000/api/v1/todo/list' - Method => Get

# PostMan API Request steps to follow

1. Signup with username and password
2. Signin with same username and password then you will recieve jwt token
3. Then request to any one of the todo api's with `Bearer token` (token recieved in step two)
