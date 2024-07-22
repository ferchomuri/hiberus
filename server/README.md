# SIMPLE SERVER

This is just a mock created for the Hiberus's Test.

### Login

users:
-email: "john.doe@mail.com"
-password: "12345678"

-email: "fer@fer.com"
-password: "12345678"

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"john.doe@mail.com","password":"12345678"}' \
  http://localhost:8080/login
```

```
curl --location 'http://localhost:8080/movies' \
--header 'Authorization: YOUR_TOKEN
```
