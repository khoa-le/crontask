package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/khoa-le/crontask/utils"

	"github.com/gin-gonic/gin"
	"github.com/khoa-le/crontask/endpoint"
	"github.com/khoa-le/crontask/models"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func main() {
	initEnv()
	utils.InitLog()
	models.InitDB()
	models.InitCron()

	router := endpoint.GetMainEngine()
	router.Use(gin.LoggerWithWriter(utils.LogWriter))
	router.Use(gin.Recovery())
	port := os.Getenv("PORT")

	s := &http.Server{
		Addr:         ":" + port,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	s.ListenAndServe()
}

func initEnv() {
	fileName := ".env_dev"
	if utils.IsProd() {
		fileName = ".env"
	}
	if err := godotenv.Load(fileName); err != nil {
		log.Fatalf("Error loading %s file", fileName)
	}
}
