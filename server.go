package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"
	"net/http"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Get("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, world!")
	})

	e.Run(standard.New(":9000"))
}
