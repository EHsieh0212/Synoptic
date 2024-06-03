package main

import (
	"log"
	"os"
	"net/http"
	"io"

	"github.com/joho/godotenv"
	"github.com/robfig/cron/v3"
)


func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Initialize a new cron scheduler with seconds precision
	schedule := cron.New(cron.WithSeconds())

	// Add a cron job to increment product prices every minute at 0 seconds
	_, err := schedule.AddFunc("0 * * * * *", incrementProductPrices)
	if err != nil {
		log.Fatalf("Error scheduling cron job: %v", err)
	}

	// Start the cron scheduler
	schedule.Start()

	// Keep the program running
	select {}
}

func incrementProductPrices() {
	// Get the Node.js server URL from environment variables
	nodeServerURL := os.Getenv("REACT_APP_WEBSITE_URL")

	// Make a POST request to update Price by 1 dollar
	resp, err := http.Post(nodeServerURL+"/api/v1/prices/increasePriceToFightInflation", "application/json", nil)
	if err != nil {
		log.Fatalf("Failed to increate price product: %v", err)
	}

	// Ensure the response body is closed
	defer resp.Body.Close()

	// Read the response body by package "io"
	body, err := io.ReadAll(resp.Body)
	if err != nil {
        log.Fatalf("Failed to read response body: %v", err)
    }

	if resp.StatusCode != http.StatusOK {
        log.Fatalf("Failed to update prices, status code: %d", resp.StatusCode)
    }
	maxBodyLength := 500
	bodyToPrint := string(body)
	if len(bodyToPrint) > maxBodyLength {
        bodyToPrint = bodyToPrint[:maxBodyLength] + "..."
    }
	log.Printf("Response Body: %v", bodyToPrint)
	log.Println("Product prices incremented successfully.")
}

