package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	fs := http.FileServer(http.Dir("./build/"))
	e.GET("/kpture/dashboard/*", echo.WrapHandler(http.StripPrefix("/kpture/dashboard/", fs)))

	fmt.Println(e.Start("0.0.0.0:8080"))
}
