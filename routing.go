package main

import (
	"net/http"

	"github.com/labstack/echo"
)

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, world!")
}

func secret(c echo.Context) error {
	return c.String(http.StatusOK, "SECRET PAGE")
}

func init() {
	e.Get("/", hello)
	e.Get("/secret", secret)
}
