package main

import (
	"context"
	"fmt"

	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

func main() {
	keyset, err := jwk.Fetch(context.Background(), "http://localhost:5173/api/auth/jwks")

	if err != nil {

		panic(err)
	}

	tokenString := "eyJhbGciOiJFZERTQSIsImtpZCI6ImZXeUtTY3RIU2xaeXB4a3N5SjlEWWJXMFJjYXRiNTdnIn0.eyJpYXQiOjE3NTg2NjI0MTAsIm5hbWUiOiJBdmlvciBQIiwiZW1haWwiOiJhYmlvenBwQGdtYWlsLmNvbSIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJpbWFnZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wOS0yMVQyMjo0Mzo1MS42MTBaIiwidXBkYXRlZEF0IjoiMjAyNS0wOS0yMVQyMjo0Mzo1MS42MTBaIiwiaWQiOiJYQ0pYN25UN01XR0RrYzBEZ2FsdndHZVZSS0M2M1F1UyIsInN1YiI6IlhDSlg3blQ3TVdHRGtjMERnYWx2d0dlVlJLQzYzUXVTIiwiZXhwIjoxNzU4NjYzMzEwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMifQ.R5jtZOV_G5A9JYjS7hzc-fnonWkt0h1MAGKluiW0DQvW94ZttlFMhEmeQXWX5rp67imDRVW2gYTn2WNAxp09CQ"

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
