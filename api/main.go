package main

import (
	"log"
	"net/http"

	"github/TomasTV/Go-Angular-WebService/database"
	"github/TomasTV/Go-Angular-WebService/product"

	_ "github.com/go-sql-driver/mysql"
)

const basePath = "/api"

func main() {
	database.SetupDatabase()
	// receipt.SetupRoutes(basePath)
	product.SetupRoutes(basePath)
	log.Fatal(http.ListenAndServe(":5000", nil))
}
