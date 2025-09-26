package main

import (
	"context"
	"fmt"

	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

// middleware on request

func main() {

	// token from request
	tokenString := "eyJhbGciOiJFZERTQSIsImtpZCI6ImZXeUtTY3RIU2xaeXB4a3N5SjlEWWJXMFJjYXRiNTdnIn0.eyJpYXQiOjE3NTg5MDA2MzMsIm5hbWUiOiJBdmlvciBQIiwiZW1haWwiOiJhYmlvenBwQGdtYWlsLmNvbSIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJpbWFnZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wOS0yMVQyMjo0Mzo1MS42MTBaIiwidXBkYXRlZEF0IjoiMjAyNS0wOS0yMVQyMjo0Mzo1MS42MTBaIiwiaWQiOiJYQ0pYN25UN01XR0RrYzBEZ2FsdndHZVZSS0M2M1F1UyIsInN1YiI6IlhDSlg3blQ3TVdHRGtjMERnYWx2d0dlVlJLQzYzUXVTIiwiZXhwIjoxNzU4OTAxNTMzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ.Ro1oRJJ7RjnYpFdSV96pKWmuk925RJefodqIl0QxtDxlTaVPh6Srlm5BIc05TCW5f2fBKqhx_DuH5jJLALNrCA"

	// jwt.ParseRequest(r, jwt.WithKeySet(keyset), jwt.WithValidate(true))

	keyset, err := jwk.Fetch(context.Background(), "http://localhost:5173/api/auth/jwks")

	if err != nil {

		panic(err)
	}

	// Verify and parse the JWT token
	token, err := jwt.Parse(
		[]byte(tokenString),
		jwt.WithKeySet(keyset),
		jwt.WithValidate(true),
	)
	if err != nil {
		fmt.Printf("Failed to parse token: %v\n", err)
		return
	}

	if token.Issuer() != "http://localhost:5173" {
		fmt.Println("Invalid token issuer")
		return
	}

	fmt.Println("Token is valid!")

	// Access token claims
	fmt.Printf("Subject: %s\n", token.Subject())
	fmt.Printf("Issuer: %s\n", token.Issuer())
	fmt.Printf("Audience: %v\n", token.Audience())

	claims := token.PrivateClaims()
	for key, value := range claims {
		fmt.Printf("Custom claim %s: %v\n", key, value)
	}

}
