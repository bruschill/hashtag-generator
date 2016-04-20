package main

import "github.com/labstack/echo/middleware"

func init() {
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root: "public",
	}))
}
