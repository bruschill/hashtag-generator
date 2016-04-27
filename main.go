package main

import (
	"log"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/labstack/echo/middleware"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be defined")
	}

	app := echo.New()

	//basic middleware
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())

	//asset config
	app.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root: "public",
	}))

	//root path config
	app.File("/", "public/index.html")

	app.Run(standard.New(":" + port))
}
