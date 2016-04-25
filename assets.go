package main

import "github.com/labstack/echo/middleware"

func init() {
	app.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root: "public",
	}))
}
