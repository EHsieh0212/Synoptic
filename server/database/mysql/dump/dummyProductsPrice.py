import re
from datetime import datetime, timedelta
import random
random.seed(42)

start_idx = 52
end_idx = 77
price_query_prefix = "INSERT INTO prices (product_id, price, created_at, updated_at) VALUES"
price_query_format = "({product_id}, {price}, \"{created_at}\", \"{updated_at}\"),"


print(price_query_prefix)
for i in range(start_idx, end_idx):
    if i == end_idx - 1:
        thestr = price_query_format.format(product_id=i, price=random.randint(100, 1000), created_at=datetime.now(), updated_at=datetime.now())
        last_comma_pos = thestr.rfind(',')
        thestr = thestr[:last_comma_pos] + ';'
        print(thestr)
    else:
        print(price_query_format.format(product_id=i, price=random.randint(100, 1000), created_at=datetime.now(), updated_at=datetime.now()))


