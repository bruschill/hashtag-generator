package main

import (
	"net/http"

	"github.com/labstack/echo"
)

func hello(c echo.Context) error {
	return c.Render(http.StatusOK, "hello", "World")
}

func init() {
	e.Get("/", hello)
}
