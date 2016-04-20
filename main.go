package main

import (
	"log"
	"os"

	"github.com/labstack/echo/engine/standard"
)

var e = createMux()

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be defined")
	}

	e.Run(standard.New(":" + port))
}
