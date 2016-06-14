package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/infiniteloopsco/guartz/utils"

	"github.com/gin-gonic/gin"
	"github.com/infiniteloopsco/guartz/endpoint"
	"github.com/infiniteloopsco/guartz/models"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)


func main() {
	initEnv()
	utils.InitLog()
	models.InitDB()
	models.InitCron()

	router := endpoint.GetMainEngine()
	router.Static("/assets", "./assets")
		
	router.LoadHTMLGlob("templates/*")
    //router.LoadHTMLFiles("templates/template1.html", "templates/template2.html")
    router.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.tmpl", gin.H{
            "title": "Main website",
        })
    })
	
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
