package main

import (
	"log"
	"os"

	"github.com/labstack/echo/engine/standard"
)

import _ "github.com/joho/godotenv/autoload"

var app = createMux()

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be defined")
	}

	app.Run(standard.New(":" + port))
}
