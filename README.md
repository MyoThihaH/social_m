# social_m
social media project



To get jwt token you need to navigate /sign_in and sign in with your credentials.
If you have not been created account navigate to /sign_up and create your own account.

Routes

POST /sign_up =>  // to sign_up
```
header =>
Content-Type : application/json

example request body= { "username":"Bob", "email":"bob@gmail.com", "password":"1234", "confirmPassword":"1234" }
```

POST /sign_in =>  // to sign_in
```
header =>
Content-Type : application/json

example request body= { "email":"bob@gmail.com", "password":"1234" }
```
GET /users/getUsers => to get all users id // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here
```

PATCH /users/:id/follow => to follow and unfollow user // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here
```

GET /posts  => get all the posts and share of your following users. // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here
```

POST /posts => to create the post // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here

example request body = {"title":"test","message":"something","selectedFile":"base64 string","tags":"test somethings totestapi"}
```

PATCH /posts/:id => to edit post with post id // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here

If you want to edit title and message field
example request body = {"title":"test","message":"something"}
```

PATCH /posts/:id/like =>  to like and unlike the post // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here
```

PATCH /posts/:id/comment  =>  to comment the post // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here

example request body = { "text":"this is comment" }
```

PATCH /posts/:id/comment/reply =>  to reply comment // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here

example request body = { "commentId":"paste comment id you want to reply", "text":"this is reply" }
```

DELETE /posts/:id => //to delete post with id // Need jwt token
```
header =>
Content-Type : application/json
Authorization : Bearer pls_paste_your_jwt_token_here
```

