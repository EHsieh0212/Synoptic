from datetime import datetime, timedelta
import random
random.seed(42)

# constants
categories = ["men", "women"]
num_of_category_products = 5
base_url = "dummy.com"
description = "Lorem ipsum"
more = "further descriptions"
sizes = ('S', 'M', 'L')
colors = ('black','green','white')

# query
product_prefix = "INSERT INTO products(category, title, price, img_src, description, more, created_at, updated_at) VALUES"
product_template = "(\"{category}\", \"{title}\", {price}, \"{img_src}\", \"{description}\", \"{more}\", \"{created_at}\" , \"{updated_at}\");"
variant_prefix = "INSERT INTO variants(product_id, size, color, quantity, created_at, updated_at) VALUES"
variant_template = "({product_id}, \"{size}\", \"{color}\", {quantity}, \"{created_at}\" , \"{updated_at}\");"

# random date generator
def random_date():
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2023, 12, 31)
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_seconds = random.randint(0, delta.seconds)
    return start_date + timedelta(days=random_days, seconds=random_seconds)

# main
for category in categories:
    for i in range(num_of_category_products):
        product_query = product_template.format(
            category=category,
            title=f"{category}-{i+1}",
            price=random.randint(100, 1000),
            img_src=f"{base_url}/{random.randint(50, 90)}.jpg",
            description=description,
            more=more,
            created_at=random_date(),
            updated_at=datetime.now()
        )
        print(product_prefix, product_query)
        print("SELECT LAST_INSERT_ID() INTO @product_id;")
        for size in sizes:
            for color in colors:
                variant_query = variant_template.format(
                    product_id="@product_id",
                    size=size,
                    color=color,
                    quantity=random.randint(1, 20),
                    created_at=random_date(),
                    updated_at=datetime.now()
                )
                print(variant_prefix, variant_query)
