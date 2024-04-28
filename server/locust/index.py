from locust import HttpUser, task, between

class BrowsingUser(HttpUser):
    wait_time = between(1, 2)
    host = "http://localhost:4000"

    @task
    def get_products(self):
        self.client.get("/api/v1/products/women/?paging=1")

class CheckoutUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://localhost:4000"

    @task
    def browse_product_details(self):
        self.client.get("/api/v1/products/details?id=64")


