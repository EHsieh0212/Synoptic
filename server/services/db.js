// this could be done by cronjobs
const db = [
    {
      id: 45,
      category: 'men',
      title: 'Urban Voyager Jacket',
      description: 'The Urban Voyager Jacket is your go-to choice for urban exploration. Crafted from durable materials, it offers a blend of style and functionality with its sleek design and practical features, making it the perfect companion for your city adventures.'
    },
    {
      id: 46,
      category: 'men',
      title: 'Precision Tailored Blazer',
      description: 'Make a statement with the Precision Tailored Blazer. Meticulously crafted for a sharp and polished look, this blazer is tailored to perfection. The high-quality fabric and precise detailing exude sophistication, making it an essential piece for any formal occasion or professional setting.'
    },
    {
      id: 47,
      category: 'men',
      title: 'Streetwise Denim Shirt',
      description: 'The Streetwise Denim Shirt is a versatile wardrobe staple. Its rugged denim construction meets street-style flair, creating a timeless yet trendy piece. Pair it with jeans for a classic denim-on-denim look or dress it up with chinos for a smart-casual vibe that effortlessly transitions from day to night.'
    },
    {
      id: 48,
      category: 'men',
      title: 'Infinity Knit Sweater',
      description: "Indulge in the cozy comfort of the Infinity Knit Sweater. Crafted from premium yarns, this sweater offers a luxuriously soft touch and excellent warmth. The infinity knit pattern adds a touch of texture, while the classic design ensures it's a timeless addition to your winter wardrobe."
    },
    {
      id: 49,
      category: 'men',
      title: 'Maverick Leather Jacket',
      description: 'Embrace the Maverick Leather Jacket for a rebellious edge to your style. Crafted from supple leather, it exudes an effortlessly cool vibe. The biker-inspired details and tailored fit make it a standout piece for casual outings, adding a touch of rugged sophistication to your look.'
    },
    {
      id: 50,
      category: 'men',
      title: 'Lunar Explorer Parka',
      description: 'Embark on a style journey with the Lunar Explorer Parka. Designed for urban exploration, this parka combines fashion and function seamlessly. The weather-resistant fabric, multiple pockets, and insulated lining ensure you stay stylishly protected on your outdoor adventures.'
    },
    {
      id: 51,
      category: 'men',
      title: 'Quantum Casual Chinos',
      description: 'Navigate the city streets with the Quantum Casual Chinos. These versatile chinos strike the perfect balance between comfort and style. The tailored fit and durable fabric make them suitable for both casual and semi-formal occasions, providing a sleek and polished appearance.'
    },
    {
      id: 52,
      category: 'men',
      title: 'Elegance Elite Tuxedo',
      description: 'Indulge in the timeless elegance of the Elegance Elite Tuxedo. Meticulously tailored for a sharp silhouette, this tuxedo exudes sophistication. The satin lapels and well-fitted design make it a standout choice for formal events, ensuring you make a lasting impression.'
    },
    {
      id: 53,
      category: 'men',
      title: 'Velocity Sports Hoodie',
      description: "Elevate your sporty style with the Velocity Sports Hoodie. Crafted for comfort, this hoodie features a sleek design and high-quality fabric. Whether you're hitting the gym or running errands, its athletic aesthetic and cozy feel make it a wardrobe essential for active lifestyles."
    },
    {
      id: 54,
      category: 'men',
      title: 'Nomad Navigator Vest',
      description: "The Nomad Navigator Vest is your versatile layering companion. Crafted for both style and functionality, it adds a rugged touch to your outfit. With its practical pockets and durable construction, it's the ideal choice for urban exploration or outdoor adventures."
    },
    {
      id: 55,
      category: 'men',
      title: 'Celestial Linen Shirt',
      description: "Experience the breezy comfort of the Celestial Linen Shirt. Crafted from lightweight linen, it's perfect for warm days. The celestial-inspired design adds a touch of uniqueness, while the relaxed fit ensures a laid-back and effortlessly stylish look for casual occasions."
    },
    {
      id: 56,
      category: 'men',
      title: 'Summit Ascent Polo',
      description: 'Conquer new heights in style with the Summit Ascent Polo. Designed for both performance and fashion, this polo combines a sporty aesthetic with refined details. The moisture-wicking fabric and modern design make it suitable for both active pursuits and casual outings.'
    },
    {
      id: 57,
      category: 'men',
      title: 'Fusion Flex Jeans',
      description: 'Experience flexibility and style with the Fusion Flex Jeans. Crafted from innovative stretch denim, these jeans provide maximum comfort without compromising on style. The modern fit and versatile design make them a go-to choice for casual occasions.'
    },
    {
      id: 58,
      category: 'men',
      title: 'Solaris Striped Tee',
      description: "Step into the Solaris Striped Tee for a laid-back yet stylish look. The striped pattern adds a touch of classic charm, while the soft and breathable fabric ensures comfort. Whether paired with jeans or shorts, it's a versatile choice for casual outings and relaxed weekends."
    },
    {
      id: 59,
      category: 'men',
      title: 'Stealth Mode Cargo Pants',
      description: 'Master the art of casual cool with the Stealth Mode Cargo Pants. Crafted for both comfort and utility, these cargo pants feature multiple pockets and a relaxed fit. The durable fabric and modern design make them a practical and stylish choice for your everyday adventures.'
    },
    {
      id: 60,
      category: 'men',
      title: 'Nova Peak Performance Shorts',
      description: 'Reach new peaks in performance with the Nova Peak Performance Shorts. Designed for active lifestyles, these shorts combine functionality with modern style. The moisture-wicking fabric and ergonomic design ensure optimal comfort during workouts or outdoor activities.'
    },
    {
      id: 61,
      category: 'men',
      title: 'Horizon Henley Pullover',
      description: "Experience comfort and style with the Horizon Henley Pullover. Crafted from soft fabric, it's perfect for casual days. The Henley neckline and relaxed fit add a touch of laid-back charm, making it a versatile choice for off-duty occasions."
    },
    {
      id: 62,
      category: 'women',
      title: 'Ethereal Elegance Gown',
      description: 'This ethereal gown embodies timeless elegance with its flowing silhouette and delicate lace detailing. Crafted from silky chiffon fabric, it drapes gracefully to the floor, while the intricate lace overlay adds a touch of romantic allure. Perfect for formal occasions or special events, this gown exudes sophistication and femininity.'
    },
    {
      id: 63,
      category: 'women',
      title: 'Serene Silk Blouse',
      description: 'Embrace understated luxury with this serene silk blouse. Crafted from pure silk fabric, it offers a smooth and lustrous texture that feels indulgently soft against the skin. The relaxed fit and subtle sheen elevate its versatility, making it suitable for both casual and formal ensembles. Pair it with tailored trousers for a polished office look or style it with jeans for a chic weekend outfit.'
    },
    {
      id: 64,
      category: 'women',
      title: 'Radiant Rose Wrap Dress',
      description: 'Illuminate any occasion with the radiant allure of this rose wrap dress. The flattering wrap silhouette accentuates the figure, while the vibrant rose print adds a burst of color and vitality. Crafted from lightweight and breathable fabric, it ensures effortless comfort and movement. Whether worn for a garden party or a summer soirée, this dress exudes feminine charm and sophistication.'
    },
    {
      id: 65,
      category: 'women',
      title: 'Chic Cascade Cardigan',
      description: 'Elevate your layering game with this chic cascade cardigan. Featuring a cascading open front design, it drapes effortlessly over the body for a flattering and fluid silhouette. The soft knit fabric offers warmth and comfort, making it an ideal layering piece for transitioning between seasons. With its versatile style, this cardigan adds a touch of sophistication to any ensemble, whether paired with jeans and a tee for a casual look or layered over a dress for a more polished outfit.'
    },
    {
      id: 66,
      category: 'women',
      title: 'Sapphire Dream Jumpsuit',
      description: 'Make a statement in this sapphire dream jumpsuit that effortlessly combines elegance and comfort. Crafted from luxurious satin fabric, it features a flattering V-neckline and wide-leg silhouette that elongates the figure. The rich sapphire hue adds a touch of opulence, while the adjustable waist tie cinches in the waist for a feminine silhouette. Perfect for evening events or formal occasions, this jumpsuit exudes timeless sophistication and modern glamour.'
    },
    {
      id: 67,
      category: 'women',
      title: 'Enchanting Lace Maxi Skirt',
      description: 'Embrace romantic femininity with this enchanting lace maxi skirt. Crafted from delicate lace fabric, it features intricate floral patterns that exude vintage charm and elegance. The maxi length adds drama and sophistication, while the soft lining ensures comfort and coverage. Whether paired with a tucked-in blouse for a formal look or a cropped top for a bohemian vibe, this skirt is sure to make a statement at any event.'
    },
    {
      id: 68,
      category: 'women',
      title: 'Opulent Orchid Kimono',
      description: "Wrap yourself in luxurious style with this opulent orchid kimono. Crafted from silky satin fabric, it drapes gracefully over the body for a fluid and elegant silhouette. The vibrant orchid print adds a pop of color and visual interest, while the wide sleeves and waist tie enhance the kimono's relaxed and bohemian vibe. Whether worn as a statement piece over a simple outfit or as a glamorous cover-up for lounging at home, this kimono exudes effortless sophistication and chic allure."
    },
    {
      id: 69,
      category: 'women',
      title: 'Dazzling Diamond Velvet Dress',
      description: "Command attention in this dazzling diamond velvet dress that exudes opulence and glamour. Crafted from plush velvet fabric, it features a figure-hugging silhouette and intricate diamond-patterned detailing that adds texture and visual interest. The rich emerald hue enhances its luxurious appeal, while the off-the-shoulder neckline adds a touch of allure. Perfect for formal events or evening soirées, this dress ensures you'll make a stunning entrance wherever you go."
    },
    {
      id: 70,
      category: 'women',
      title: 'Glamourous Gala Ballgown',
      description: 'Make a grand entrance in this glamorous gala ballgown that epitomizes sophistication and elegance. Crafted from luxurious satin fabric, it features a fitted bodice with intricate beading and a voluminous ballgown skirt that exudes timeless glamour. The off-the-shoulder neckline adds a touch of romance, while the corset-style lace-up back ensures a flattering fit. Whether worn for a black-tie event or a formal gala, this ballgown is sure to turn heads and leave a lasting impression.'
    },
    {
      id: 71,
      category: 'women',
      title: 'Whimsical Willow Flare Pants',
      description: 'Elevate your everyday style with these whimsical willow flare pants that combine comfort and sophistication. Crafted from lightweight and breathable fabric, they feature a high-rise waist and wide-leg silhouette that elongates the legs for a flattering look. The whimsical willow print adds a touch of charm and whimsy, while the elasticated waistband ensures a comfortable fit. Whether paired with a blouse for a polished office ensemble or a cropped top for a relaxed weekend look, these pants exude effortless chic and timeless appeal.'
    },
    {
      id: 72,
      category: 'women',
      title: 'Mystic Moonlight Midi Dress',
      description: "Embrace ethereal elegance with this mystic moonlight midi dress that exudes romantic allure. Crafted from delicate chiffon fabric, it features an enchanting moonlight print that adds a whimsical touch to the silhouette. The midi length and flowing skirt create a flattering and feminine silhouette, while the V-neckline and adjustable waist tie enhance the dress's elegant charm. Whether worn for a garden wedding or a summer soirée, this dress ensures effortless sophistication and timeless style."
    },
    {
      id: 73,
      category: 'women',
      title: 'Golden Goddess Sequin Top',
      description: "Shine bright like a golden goddess in this sequin top that exudes glamour and allure. Crafted from shimmering sequin fabric, it features a flattering V-neckline and relaxed fit that drapes effortlessly over the body. The golden hue adds a touch of opulence and luxury, while the sheer chiffon back panel adds a hint of allure. Whether paired with jeans for a night out or styled with tailored trousers for a formal event, this top ensures you'll make a stunning statement wherever you go."
    },
    {
      id: 74,
      category: 'women',
      title: 'Blossom Breeze Boho Blouse',
      description: "Embrace bohemian chic with this blossom breeze boho blouse that exudes laid-back elegance. Crafted from lightweight and breathable fabric, it features a relaxed fit and flowing silhouette that ensures comfort and movement. The delicate blossom print adds a touch of whimsy and charm, while the lace-up neckline and ruffle detailing enhance the blouse's bohemian vibe. Whether paired with denim shorts for a festival-inspired look or layered under a suede jacket for a boho-chic ensemble, this blouse adds effortless style to any outfit."
    },
    {
      id: 75,
      category: 'women',
      title: 'Crimson Charm Velvet Romper',
      description: "Make a bold statement in this crimson charm velvet romper that exudes confidence and allure. Crafted from plush velvet fabric, it features a fitted bodice with a plunging neckline and a flared shorts silhouette that elongates the legs for a flattering look. The rich crimson hue adds a pop of color and drama, while the adjustable spaghetti straps and elasticated waist ensure a comfortable and flattering fit. Whether worn for a night out or a special event, this romper ensures you'll stand out from the crowd and make a lasting impression."
    },
    {
      id: 76,
      category: 'women',
      title: 'Lavender Love Lace Camisole',
      description: 'Embrace feminine charm with this lavender love lace camisole that exudes romance and sophistication. Crafted from delicate lace fabric, it features a flattering V-neckline and adjustable spaghetti straps that ensure a comfortable and customizable fit. The soft lavender hue adds a touch of elegance and femininity, while the scalloped lace trim adds a hint of vintage-inspired charm. Whether worn as a standalone piece for a romantic evening or layered under a blazer for a polished look, this camisole adds a touch of grace and allure.'
    }
  ]

module.exports = db;
