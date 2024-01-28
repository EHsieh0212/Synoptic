menGarmentNames = [
  "Urban Voyager Jacket",
  "Precision Tailored Blazer",
  "Streetwise Denim Shirt",
  "Infinity Knit Sweater",
  "Maverick Leather Jacket",
  "Lunar Explorer Parka",
  "Quantum Casual Chinos",
  "Elegance Elite Tuxedo",
  "Velocity Sports Hoodie",
  "Nomad Navigator Vest",
  "Celestial Linen Shirt",
  "Summit Ascent Polo",
  "Fusion Flex Jeans",
  "Solaris Striped Tee",
  "Stealth Mode Cargo Pants",
  "Nova Peak Performance Shorts",
  "Horizon Henley Pullover"
]

womenGarmentNames = [
  "Ethereal Elegance Gown",
  "Serene Silk Blouse",
  "Radiant Rose Wrap Dress",
  "Chic Cascade Cardigan",
  "Sapphire Dream Jumpsuit",
  "Enchanting Lace Maxi Skirt",
  "Opulent Orchid Kimono",
  "Dazzling Diamond Velvet Dress",
  "Glamourous Gala Ballgown",
  "Whimsical Willow Flare Pants",
  "Mystic Moonlight Midi Dress",
  "Golden Goddess Sequin Top",
  "Blossom Breeze Boho Blouse",
  "Crimson Charm Velvet Romper",
  "Lavender Love Lace Camisole"
]

update_prefix = "UPDATE products SET title = \'{title}\' WHERE title = \'{category}-{number}\';"
category = ["men", "women"]

for cat in category:
    if cat == "men":
        prod_num = 17
        for i in range(prod_num):
            print(update_prefix.format(title = menGarmentNames[i], category = cat, number = i+1))
    else:
        prod_num = 15
        for i in range(prod_num):
            print(update_prefix.format(title = womenGarmentNames[i], category = cat, number = i+1))



