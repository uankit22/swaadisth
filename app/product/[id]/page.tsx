import { Suspense } from "react"
import { notFound } from "next/navigation"
import ProductDescription from "@/components/product-description"

// Mock product database - in a real app, this would come from an API or database
const productsData = {
  "1": {
    id: 1,
    name: "Masala Mathri",
    description:
      "Crispy, flaky, and perfectly spiced traditional mathri made with authentic spices and ghee. A perfect tea-time snack that brings the taste of home. Our Masala Mathri is handcrafted using a traditional family recipe that has been passed down through generations. Each piece is carefully made to ensure the perfect texture and flavor balance.",
    shortDescription: "Crispy, flaky, and perfectly spiced traditional mathri - a perfect tea-time snack.",
    price: 199,
    originalPrice: 249,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestseller: false,
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Tea-time"],
    ingredients:
      "Wheat flour, ghee, carom seeds, cumin seeds, black pepper, salt, and our special blend of spices. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 450,
      protein: 8,
      fat: 22,
      carbs: 56,
      sugar: 2,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended in hot and humid climates.",
    shelfLife: "Best consumed within 30 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 199, originalPrice: 249 },
      { value: "500g", label: "500g", price: 379, originalPrice: 449 },
      { value: "1kg", label: "1kg", price: 699, originalPrice: 849 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "The Masala Mathri is absolutely delicious! Reminds me of my grandmother's recipe. Perfect crispiness and the spice blend is just right. Will definitely order again!",
        verified: true,
      },
      {
        id: 2,
        name: "Rahul Verma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great taste and texture. The packaging was excellent and kept the mathris fresh. Would have given 5 stars but a few pieces were broken during delivery.",
        verified: true,
      },
      {
        id: 3,
        name: "Ananya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Perfect tea-time snack! The spice level is just right and they stay crispy for days. Loved the authentic taste.",
        verified: false,
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Besan Ladoo",
        price: 299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 87,
      },
      {
        id: 3,
        name: "Aloo Bhujia",
        price: 149,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 56,
      },
      {
        id: 5,
        name: "Methi Mathri",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 38,
      },
      {
        id: 12,
        name: "Namkeen Mix",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 89,
      },
    ],
    videoUrl: "https://www.youtube.com/embed/PDV3CGvLdQo",
  },
  "2": {
    id: 2,
    name: "Besan Ladoo",
    description:
      "Delicious, melt-in-your-mouth besan ladoos made with roasted gram flour, ghee, and just the right amount of sweetness. These traditional Indian sweets are perfect for festivals, celebrations, or as a special treat with your evening tea. Each ladoo is carefully crafted to achieve the perfect texture and flavor balance.",
    shortDescription: "Melt-in-your-mouth besan ladoos made with roasted gram flour and pure ghee.",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.9,
    reviews: 87,
    isNew: false,
    isBestseller: true,
    category: "Sweets",
    tags: ["Sweet", "Festive", "Gram flour"],
    ingredients:
      "Gram flour (besan), pure ghee, powdered sugar, cardamom powder, and chopped nuts. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 6,
      fat: 28,
      carbs: 62,
      sugar: 38,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended in hot and humid climates.",
    shelfLife: "Best consumed within 15 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 299, originalPrice: 349 },
      { value: "500g", label: "500g", price: 549, originalPrice: 649 },
      { value: "1kg", label: "1kg", price: 999, originalPrice: 1199 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Amit Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "These besan ladoos are absolutely divine! Perfect sweetness and the cardamom flavor is just right. Reminds me of my mother's homemade ladoos.",
        verified: true,
      },
      {
        id: 2,
        name: "Meera Joshi",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Ordered these for Diwali and they were a hit with the entire family. The texture is perfect - not too dry, not too soft. Will definitely order again!",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 1,
        name: "Masala Mathri",
        price: 199,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 6,
        name: "Kaju Katli",
        price: 499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 112,
      },
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
    ],
  },
  "3": {
    id: 3,
    name: "Aloo Bhujia",
    description:
      "Crispy, spicy, and utterly addictive Aloo Bhujia made with fresh potatoes, gram flour, and a special blend of spices. This popular Indian snack is perfect for munching anytime. Our Aloo Bhujia is made in small batches to ensure maximum freshness and that perfect crunch in every bite.",
    shortDescription: "Crispy, spicy potato sev - the perfect anytime snack.",
    price: 149,
    originalPrice: 179,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.7,
    reviews: 56,
    isNew: false,
    isBestseller: false,
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Potato"],
    ingredients:
      "Potato flour, gram flour (besan), edible vegetable oil, salt, red chili powder, and our special blend of spices. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 6,
      fat: 32,
      carbs: 52,
      sugar: 1,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. Once opened, consume within 2 weeks for best taste.",
    shelfLife: "Best consumed within 60 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "200g", label: "200g", price: 149, originalPrice: 179 },
      { value: "500g", label: "500g", price: 329, originalPrice: 379 },
      { value: "1kg", label: "1kg", price: 599, originalPrice: 699 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Rajesh Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Aloo Bhujia is dangerously good! I can't stop munching on it. Perfect spice level and so crispy. Much better than the mass-produced ones in the market.",
        verified: true,
      },
      {
        id: 2,
        name: "Sunita Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Very tasty and fresh. The packaging is excellent and keeps it crispy. Would have given 5 stars but I personally prefer it a bit spicier.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 1,
        name: "Masala Mathri",
        price: 199,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 5,
        name: "Methi Mathri",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 38,
      },
      {
        id: 8,
        name: "Bhakarwadi",
        price: 169,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 92,
      },
    ],
  },
  "4": {
    id: 4,
    name: "Dry Fruit Mixture",
    description:
      "Premium mixture of handpicked dry fruits and nuts, lightly roasted and seasoned. A healthy and delicious snack packed with nutrients.",
    shortDescription: "Premium mixture of handpicked dry fruits and nuts.",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.9,
    reviews: 112,
    isNew: false,
    isBestseller: true,
    category: "Snacks",
    tags: ["Premium", "Dry Fruits", "Healthy"],
    ingredients:
      "Almonds, cashews, pistachios, raisins, and a blend of spices. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 550,
      protein: 15,
      fat: 35,
      carbs: 45,
      sugar: 20,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 60 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 399, originalPrice: 449 },
      { value: "500g", label: "500g", price: 749, originalPrice: 849 },
      { value: "1kg", label: "1kg", price: 1399, originalPrice: 1599 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Vikram Singh",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "The best Dry Fruit Mixture I've ever had! So fresh and perfectly roasted. The spices add a nice touch.",
        verified: true,
      },
      {
        id: 2,
        name: "Neha Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Ordered these for a family gathering and everyone loved them. The quality is excellent and they taste so good. Will definitely order again!",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Besan Ladoo",
        price: 299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 87,
      },
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
      {
        id: 15,
        name: "Rasgulla",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 65,
      },
    ],
  },
  "5": {
    id: 5,
    name: "Methi Mathri",
    description:
      "Crispy, flaky mathri with the distinctive flavor of fenugreek (methi) and a perfect blend of spices. This traditional savory snack is perfect with tea or as an anytime munch. Our Methi Mathri is handcrafted using a traditional recipe that brings out the perfect balance of flavors.",
    shortDescription: "Crispy, flaky mathri with the distinctive flavor of fenugreek leaves.",
    price: 179,
    originalPrice: 219,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.6,
    reviews: 38,
    isNew: false,
    isBestseller: false,
    category: "Snacks",
    tags: ["Crispy", "Fenugreek", "Tea-time"],
    ingredients:
      "Wheat flour, ghee, dried fenugreek leaves, carom seeds, cumin seeds, black pepper, salt, and our special blend of spices. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 460,
      protein: 8,
      fat: 24,
      carbs: 54,
      sugar: 1,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended in hot and humid climates.",
    shelfLife: "Best consumed within 30 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 179, originalPrice: 219 },
      { value: "500g", label: "500g", price: 339, originalPrice: 399 },
      { value: "1kg", label: "1kg", price: 649, originalPrice: 779 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Kavita Reddy",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "The Methi Mathri has such a wonderful flavor! The fenugreek adds a lovely dimension to the traditional mathri. Perfect crispiness too!",
        verified: true,
      },
      {
        id: 2,
        name: "Suresh Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great taste and texture. The methi flavor is just right - not too overpowering. Would recommend to anyone who enjoys savory snacks.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 1,
        name: "Masala Mathri",
        price: 199,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 3,
        name: "Aloo Bhujia",
        price: 149,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 56,
      },
      {
        id: 12,
        name: "Namkeen Mix",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 89,
      },
    ],
  },
  "6": {
    id: 6,
    name: "Kaju Katli",
    description:
      "Smooth, melt-in-your-mouth Kaju Katli made with premium cashews and just the right amount of sweetness. This classic Indian sweet is perfect for festivals, celebrations, or as a luxurious treat with your evening tea. Each piece is carefully crafted to achieve that signature thin, diamond-shaped perfection.",
    shortDescription: "Premium cashew-based sweet with a silky smooth texture.",
    price: 499,
    originalPrice: 599,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.9,
    reviews: 112,
    isNew: false,
    isBestseller: true,
    category: "Sweets",
    tags: ["Premium", "Cashew", "Festive"],
    ingredients:
      "Cashew nuts, sugar, ghee, cardamom powder, and edible silver foil (vark). All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 545,
      protein: 12,
      fat: 35,
      carbs: 48,
      sugar: 32,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 15 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 499, originalPrice: 599 },
      { value: "500g", label: "500g", price: 949, originalPrice: 1099 },
      { value: "1kg", label: "1kg", price: 1799, originalPrice: 2099 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Vikram Singh",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "The best Kaju Katli I've ever had! So smooth and perfectly sweet. The silver foil is a nice touch for gifting.",
        verified: true,
      },
      {
        id: 2,
        name: "Neha Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Ordered these for a family celebration and everyone loved them. The texture is perfect - smooth and melts in your mouth. Will definitely order again!",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Besan Ladoo",
        price: 299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 87,
      },
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
      {
        id: 8,
        name: "Bhakarwadi",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 65,
      },
    ],
  },
  "7": {
    id: 7,
    name: "Moong Dal Halwa",
    description:
      "Rich and decadent Moong Dal Halwa made with split yellow lentils, ghee, and sugar. This traditional Indian dessert is perfect for celebrations and special occasions. Our Moong Dal Halwa is slow-cooked to perfection for a melt-in-your-mouth texture.",
    shortDescription: "Rich and decadent halwa made with moong dal and ghee.",
    price: 349,
    originalPrice: 399,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 92,
    isNew: false,
    isBestseller: true,
    category: "Sweets",
    tags: ["Traditional", "Lentils", "Dessert"],
    ingredients:
      "Split yellow lentils (moong dal), ghee, sugar, cardamom powder, and almonds. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 540,
      protein: 8,
      fat: 34,
      carbs: 50,
      sugar: 1,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. Once opened, consume within 2 weeks for best taste.",
    shelfLife: "Best consumed within 60 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "200g", label: "200g", price: 349, originalPrice: 399 },
      { value: "500g", label: "500g", price: 649, originalPrice: 749 },
      { value: "1kg", label: "1kg", price: 1249, originalPrice: 1399 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Mohan Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "This is the real deal! Authentic Moong Dal Halwa taste that takes me back to my childhood. Perfect sweetness and texture.",
        verified: true,
      },
      {
        id: 2,
        name: "Preeti Agarwal",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Absolutely delicious! The texture is perfect and the flavor is rich and satisfying. Much better than store-bought varieties.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 3,
        name: "Aloo Bhujia",
        price: 149,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 56,
      },
      {
        id: 1,
        name: "Masala Mathri",
        price: 199,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 12,
        name: "Namkeen Mix",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 89,
      },
    ],
  },
  "8": {
    id: 8,
    name: "Bhakarwadi",
    description:
      "Spicy and tangy Bhakarwadi, a popular Maharashtrian snack. These crispy, spiral-shaped rolls are filled with a blend of spices, coconut, and sesame seeds. A perfect tea-time snack with a unique flavor.",
    shortDescription: "Spicy and tangy Maharashtrian snack.",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 65,
    isNew: false,
    isBestseller: false,
    category: "Snacks",
    tags: ["Spicy", "Tangy", "Maharashtrian"],
    ingredients:
      "Wheat flour, gram flour, coconut, sesame seeds, red chili powder, and spices. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 580,
      protein: 10,
      fat: 32,
      carbs: 58,
      sugar: 48,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 15 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 399, originalPrice: 449 },
      { value: "500g", label: "500g", price: 749, originalPrice: 849 },
      { value: "1kg", label: "1kg", price: 1399, originalPrice: 1599 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Deepak Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Bhakarwadi is absolutely delicious! Perfect balance of spice and tanginess. The texture is just right - crispy and flavorful.",
        verified: true,
      },
      {
        id: 2,
        name: "Shalini Kapoor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Ordered this for a family gathering and everyone loved it! The bhakarwadi has that authentic taste that's hard to find these days. Just the right amount of spice.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 6,
        name: "Kaju Katli",
        price: 499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 112,
      },
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
      {
        id: 2,
        name: "Besan Ladoo",
        price: 299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 87,
      },
    ],
  },
  "9": {
    id: 9,
    name: "Soan Papdi",
    description:
      "Flaky and melt-in-your-mouth Soan Papdi, a traditional Indian sweet made with gram flour, ghee, and sugar. This sweet is known for its delicate texture and is perfect for festive occasions.",
    shortDescription: "Flaky and melt-in-your-mouth traditional Indian sweet.",
    price: 249,
    originalPrice: 299,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.6,
    reviews: 48,
    isNew: true,
    isBestseller: false,
    category: "Sweets",
    tags: ["Sweet", "Traditional", "Flaky"],
    ingredients:
      "Gram flour, ghee, sugar, cardamom powder, and almonds. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 480,
      protein: 6,
      fat: 24,
      carbs: 60,
      sugar: 25,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. Best consumed within 2 weeks of opening.",
    shelfLife: "Best consumed within 45 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "200g", label: "200g", price: 249, originalPrice: 299 },
      { value: "400g", label: "400g", price: 449, originalPrice: 549 },
      { value: "800g", label: "800g", price: 849, originalPrice: 999 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Rohit Malhotra",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Soan Papdi is a delightful surprise! The texture is perfect and it melts in your mouth. Great with evening chai!",
        verified: true,
      },
      {
        id: 2,
        name: "Anita Desai",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment: "Unique and delicious! The sweet is not too sweet which I appreciate. Will order again!",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 12,
        name: "Namkeen Mix",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 89,
      },
      {
        id: 1,
        name: "Masala Mathri",
        price: 199,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 5,
        name: "Methi Mathri",
        price: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 38,
      },
    ],
  },
  "10": {
    id: 10,
    name: "Chakli",
    description:
      "Spiral-shaped, crispy, and savory Chakli made with rice flour, gram flour, and a special blend of spices. This traditional Indian snack has a distinctive texture and flavor that makes it perfect for tea time or festive occasions. Our Chakli is made in small batches following a traditional recipe for authentic taste.",
    shortDescription: "Spiral-shaped, crispy, and savory snack made with rice flour and spices.",
    price: 179,
    originalPrice: 219,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 89,
    isNew: false,
    isBestseller: false,
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Traditional"],
    ingredients:
      "Rice flour, gram flour (besan), sesame seeds, cumin seeds, edible vegetable oil, salt, red chili powder, and our special blend of spices. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 7,
      fat: 30,
      carbs: 54,
      sugar: 1,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. Once opened, consume within 2 weeks for best taste.",
    shelfLife: "Best consumed within 60 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "200g", label: "200g", price: 179, originalPrice: 219 },
      { value: "500g", label: "500g", price: 399, originalPrice: 459 },
      { value: "1kg", label: "1kg", price: 749, originalPrice: 859 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Vijay Patil",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "These Chaklis are absolutely perfect! Just the right amount of spice and so crispy. Reminds me of the ones my grandmother used to make.",
        verified: true,
      },
      {
        id: 2,
        name: "Lakshmi Rao",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Excellent quality Chakli! The spiral shape is perfect and they're so crispy and flavorful. Great with evening tea or as a snack anytime.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 1,
        name: "Masala Mathri",
        price: 199,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 3,
        name: "Aloo Bhujia",
        price: 149,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 56,
      },
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 169,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 92,
      },
    ],
  },
  "11": {
    id: 11,
    name: "Gulab Jamun",
    description:
      "Soft and spongy Gulab Jamun, deep-fried milk balls soaked in fragrant sugar syrup. This classic Indian dessert is a perfect treat for any occasion.",
    shortDescription: "Soft and spongy milk balls soaked in fragrant sugar syrup.",
    price: 549,
    originalPrice: 649,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.9,
    reviews: 58,
    isNew: true,
    isBestseller: true,
    category: "Sweets",
    tags: ["Premium", "Traditional", "Festive"],
    ingredients:
      "Milk solids (khoya), sugar, cardamom powder, and saffron. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 590,
      protein: 14,
      fat: 38,
      carbs: 52,
      sugar: 36,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 15 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 549, originalPrice: 649 },
      { value: "500g", label: "500g", price: 1049, originalPrice: 1199 },
      { value: "1kg", label: "1kg", price: 1999, originalPrice: 2299 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Arjun Kapoor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "These Gulab Jamuns are absolutely divine! The perfect balance of sweetness. The texture is just right - not too soft, not too hard.",
        verified: true,
      },
      {
        id: 2,
        name: "Divya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Ordered these for a special occasion and they were a huge hit! The quality is excellent and you can taste the richness in every bite. Worth every penny!",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 6,
        name: "Kaju Katli",
        price: 499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 112,
      },
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
      {
        id: 15,
        name: "Rasgulla",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 72,
      },
    ],
  },
  "12": {
    id: 12,
    name: "Namkeen Mix",
    description:
      "A savory blend of crispy noodles, lentils, and spices. This classic Indian snack is perfect for munching anytime.",
    shortDescription: "A savory blend of crispy noodles, lentils, and spices.",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 72,
    isNew: false,
    isBestseller: true,
    category: "Snacks",
    tags: ["Saffron", "Milk", "Traditional"],
    ingredients:
      "Chickpea flour, lentils, spices, and nuts. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 8,
      fat: 28,
      carbs: 56,
      sugar: 42,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 15 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 399, originalPrice: 449 },
      { value: "500g", label: "500g", price: 749, originalPrice: 849 },
      { value: "1kg", label: "1kg", price: 1399, originalPrice: 1599 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Kiran Reddy",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "This Namkeen Mix is absolutely delicious! The saffron flavor is just right and they're so soft and melt in your mouth. Perfect sweetness too!",
        verified: true,
      },
      {
        id: 2,
        name: "Rajiv Malhotra",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great quality pedas! The saffron aroma is wonderful and the texture is perfect. Would have given 5 stars but a few were slightly broken during delivery.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
      {
        id: 8,
        name: "Bhakarwadi",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 65,
      },
      {
        id: 11,
        name: "Gulab Jamun",
        price: 549,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 58,
      },
    ],
  },
  "13": {
    id: 13,
    name: "Kesar Peda",
    description:
      "Soft, melt-in-your-mouth Kesar Pedas made with fresh milk solids, saffron, and cardamom. These traditional Indian sweets have a rich, aromatic flavor and a distinctive yellow color from the premium saffron. Our Kesar Pedas are made in small batches following a time-honored recipe.",
    shortDescription: "Soft, melt-in-your-mouth milk-based sweet flavored with saffron and cardamom.",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 72,
    isNew: false,
    isBestseller: true,
    category: "Sweets",
    tags: ["Saffron", "Milk", "Traditional"],
    ingredients:
      "Milk solids (khoya), sugar, ghee, saffron, cardamom powder, and pistachios. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 8,
      fat: 28,
      carbs: 56,
      sugar: 42,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 15 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 399, originalPrice: 449 },
      { value: "500g", label: "500g", price: 749, originalPrice: 849 },
      { value: "1kg", label: "1kg", price: 1399, originalPrice: 1599 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Kiran Reddy",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "These Kesar Pedas are absolutely delicious! The saffron flavor is just right and they're so soft and melt in your mouth. Perfect sweetness too!",
        verified: true,
      },
      {
        id: 2,
        name: "Rajiv Malhotra",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great quality pedas! The saffron aroma is wonderful and the texture is perfect. Would have given 5 stars but a few were slightly broken during delivery.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 7,
        name: "Moong Dal Halwa",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 76,
      },
      {
        id: 8,
        name: "Bhakarwadi",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 65,
      },
      {
        id: 11,
        name: "Gulab Jamun",
        price: 549,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 58,
      },
    ],
  },
  "14": {
    id: 14,
    name: "Chivda",
    description:
      "A crispy and savory snack made from flattened rice, spices, and nuts. Perfect for tea time or anytime snacking.",
    shortDescription: "Crispy and savory snack made from flattened rice, spices, and nuts.",
    price: 219,
    originalPrice: 269,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.6,
    reviews: 54,
    isNew: false,
    isBestseller: false,
    category: "Snacks",
    tags: ["Crunchy", "Sesame", "Jaggery"],
    ingredients:
      "Flattened rice, spices, nuts, and dried fruits. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 510,
      protein: 10,
      fat: 30,
      carbs: 52,
      sugar: 36,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. Best consumed within 2 months of opening.",
    shelfLife: "Best consumed within 3 months of production. Check the package for the production date.",
    weightOptions: [
      { value: "200g", label: "200g", price: 219, originalPrice: 269 },
      { value: "400g", label: "400g", price: 399, originalPrice: 479 },
      { value: "800g", label: "800g", price: 749, originalPrice: 899 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Anil Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "This Til Chikki is absolutely perfect! The sesame seeds are toasted just right and the jaggery gives it a wonderful flavor. Not too sweet, which I appreciate.",
        verified: true,
      },
      {
        id: 2,
        name: "Meena Iyer",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great quality chikki! I love that it's made with jaggery instead of refined sugar. The texture is perfect - crunchy but not too hard on the teeth.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 13,
        name: "Kesar Peda",
        price: 199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 63,
      },
      {
        id: 15,
        name: "Rasgulla",
        price: 349,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 47,
      },
      {
        id: 8,
        name: "Bhakarwadi",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 65,
      },
    ],
  },
  "15": {
    id: 15,
    name: "Rasgulla",
    description:
      "Soft and spongy Rasgulla, cheese balls soaked in fragrant sugar syrup. This classic Indian dessert is a perfect treat for any occasion.",
    shortDescription: "Soft and spongy cheese balls soaked in fragrant sugar syrup.",
    price: 349,
    originalPrice: 399,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 47,
    isNew: true,
    isBestseller: false,
    category: "Sweets",
    tags: ["Premium", "Dry Fruits", "Jaggery"],
    ingredients:
      "Cheese, sugar, cardamom powder, and saffron. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 560,
      protein: 14,
      fat: 36,
      carbs: 48,
      sugar: 34,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. Best consumed within 2 months of opening.",
    shelfLife: "Best consumed within 3 months of production. Check the package for the production date.",
    weightOptions: [
      { value: "200g", label: "200g", price: 349, originalPrice: 399 },
      { value: "400g", label: "400g", price: 649, originalPrice: 749 },
      { value: "800g", label: "800g", price: 1249, originalPrice: 1399 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Vikrant Khanna",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Dry Fruit Chikki is absolutely luxurious! The quality of nuts used is excellent and the jaggery binds everything perfectly. A healthy treat that doesn't compromise on taste!",
        verified: true,
      },
      {
        id: 2,
        name: "Nandini Reddy",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Ordered this as a healthier alternative to regular sweets and was not disappointed! The dry fruits taste fresh and the chikki has the perfect crunch. Will definitely order again!",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 13,
        name: "Kesar Peda",
        price: 199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 63,
      },
      {
        id: 14,
        name: "Chivda",
        price: 219,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 54,
      },
      {
        id: 11,
        name: "Gulab Jamun",
        price: 549,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 58,
      },
    ],
  },
  "16": {
    id: 16,
    name: "Peanut Chikki",
    description:
      "Crunchy, sweet Peanut Chikki made with roasted peanuts and jaggery. This traditional Indian sweet is not only delicious but also nutritious, making it a perfect snack for any time of day. Our Peanut Chikki is made in small batches using a traditional recipe to ensure authentic taste and texture.",
    shortDescription: "Crunchy, sweet brittle made with roasted peanuts and jaggery.",
    price: 199,
    originalPrice: 249,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.7,
    reviews: 59,
    isNew: false,
    isBestseller: false,
    category: "Sweets",
    tags: ["Coconut", "Soft", "Traditional"],
    ingredients:
      "Roasted peanuts, jaggery, and a touch of ghee. All ingredients are 100% natural with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 490,
      protein: 6,
      fat: 26,
      carbs: 58,
      sugar: 44,
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight. For extended freshness, refrigeration is recommended.",
    shelfLife: "Best consumed within 10 days of production. Check the package for the production date.",
    weightOptions: [
      { value: "250g", label: "250g", price: 299, originalPrice: 349 },
      { value: "500g", label: "500g", price: 549, originalPrice: 649 },
      { value: "1kg", label: "1kg", price: 999, originalPrice: 1199 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Sanjay Menon",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Coconut Barfi is absolutely delicious! The coconut flavor is fresh and natural, and the texture is perfect - soft and moist. Not too sweet either, which I appreciate.",
        verified: true,
      },
      {
        id: 2,
        name: "Leela Krishnan",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great quality barfi! The coconut taste is authentic and the cardamom adds a nice flavor. Would have given 5 stars but it was slightly sweeter than I prefer.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 8,
        name: "Bhakarwadi",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 65,
      },
      {
        id: 6,
        name: "Kaju Katli",
        price: 499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 112,
      },
      {
        id: 13,
        name: "Kesar Peda",
        price: 399,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 72,
      },
    ],
  },
  "17": {
    id: 17,
    name: "Family Snacks Box",
    description:
      "Our premium Festival Celebration Box is the perfect gift for any festive occasion. This luxurious assortment includes our most popular sweets and snacks, carefully selected and beautifully packaged. Celebrate special moments with authentic flavors that bring joy to every gathering.",
    shortDescription: "Premium gift box with an assortment of festive sweets and snacks.",
    price: 1499,
    originalPrice: 1899,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.9,
    reviews: 78,
    isNew: true,
    isBestseller: true,
    category: "Special Combo",
    tags: ["Gift Box", "Festive", "Assorted", "Premium"],
    ingredients:
      "This box contains: Kaju Katli (250g), Besan Ladoo (250g), Motichoor Ladoo (250g), Masala Mathri (200g), Aloo Bhujia (200g), and Bikaneri Bhujia (200g). All items are made with 100% natural ingredients with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 9,
      fat: 28,
      carbs: 58,
      sugar: 32,
    },
    storage:
      "Store in a cool, dry place away from direct sunlight. Individual items may have different shelf lives - please check each product for specific storage instructions.",
    shelfLife:
      "Best consumed within 15-30 days of production depending on the item. Check individual packages for details.",
    weightOptions: [
      { value: "Standard", label: "Standard Box (1.35kg)", price: 1499, originalPrice: 1899 },
      { value: "Deluxe", label: "Deluxe Box (2kg)", price: 2199, originalPrice: 2699 },
      { value: "Premium", label: "Premium Box (3kg)", price: 3299, originalPrice: 3999 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Rajeev Khanna",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Ordered this for Diwali and it was a huge hit! The packaging is beautiful and the quality of sweets and snacks is exceptional. Perfect for gifting or family celebrations.",
        verified: true,
      },
      {
        id: 2,
        name: "Sheetal Agarwal",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "This celebration box exceeded my expectations! Everything was fresh and delicious. The presentation is elegant and makes for a wonderful gift. Will definitely order again for special occasions.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 18,
        name: "Diwali Special Combo",
        price: 1999,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 65,
      },
      {
        id: 19,
        name: "Tea Time Combo",
        price: 899,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 82,
      },
      {
        id: 20,
        name: "Festive Gift Box",
        price: 2499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5.0,
        reviews: 42,
      },
    ],
  },
  "18": {
    id: 18,
    name: "Diwali Special Combo",
    description:
      "Celebrate the festival of lights with our exclusive Diwali Special Hamper. This luxurious collection features traditional sweets and savories specially curated for Diwali celebrations. Beautifully packaged in a decorative box with festive motifs, it makes for a perfect gift for family, friends, and business associates.",
    shortDescription: "Exclusive hamper with traditional sweets and savories for Diwali celebrations.",
    price: 1999,
    originalPrice: 2499,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.9,
    reviews: 65,
    isNew: true,
    isBestseller: true,
    category: "Special Combo",
    tags: ["Diwali", "Gift Hamper", "Festive", "Premium"],
    ingredients:
      "This hamper contains: Kaju Katli (300g), Soan Papdi (300g), Besan Ladoo (300g), Dry Fruit Mixture (200g), Masala Mathri (200g), Chakli (200g), and a decorative clay diya. All items are made with 100% natural ingredients with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 540,
      protein: 10,
      fat: 30,
      carbs: 60,
      sugar: 35,
    },
    storage:
      "Store in a cool, dry place away from direct sunlight. Individual items may have different shelf lives - please check each product for specific storage instructions.",
    shelfLife:
      "Best consumed within 15-30 days of production depending on the item. Check individual packages for details.",
    weightOptions: [
      { value: "Standard", label: "Standard Hamper (1.5kg)", price: 1999, originalPrice: 2499 },
      { value: "Deluxe", label: "Deluxe Hamper (2.5kg)", price: 2999, originalPrice: 3699 },
      { value: "Premium", label: "Premium Hamper (4kg)", price: 4499, originalPrice: 5499 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Vivek Singhania",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Diwali hamper is absolutely stunning! The packaging is festive and elegant, and the sweets and snacks are of exceptional quality. Sent these to several family members and everyone loved them!",
        verified: true,
      },
      {
        id: 2,
        name: "Anita Bajaj",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Perfect Diwali gift! The hamper looks beautiful and everything inside is delicious. The clay diya is a thoughtful addition. Highly recommend for corporate gifting as well.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 17,
        name: "Family Snacks Box",
        price: 1499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 78,
      },
      {
        id: 19,
        name: "Tea Time Combo",
        price: 899,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 82,
      },
      {
        id: 20,
        name: "Festive Gift Box",
        price: 2499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5.0,
        reviews: 42,
      },
    ],
  },
  "19": {
    id: 19,
    name: "Tea Time Combo",
    description:
      "Our Family Snack Box is perfect for everyday snacking and family gatherings. This carefully curated selection includes a variety of savory snacks that everyone will love. Ideal for movie nights, unexpected guests, or just keeping the pantry stocked with delicious, authentic Indian snacks.",
    shortDescription: "Variety box with savory snacks perfect for family snacking and gatherings.",
    price: 899,
    originalPrice: 1099,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 82,
    isNew: false,
    isBestseller: true,
    category: "Special Combo",
    tags: ["Family Pack", "Savory", "Snacks", "Variety"],
    ingredients:
      "This box contains: Masala Mathri (200g), Aloo Bhujia (200g), Bikaneri Bhujia (200g), Methi Mathri (200g), Chakli (200g), and Namkeen Mix (200g). All items are made with 100% natural ingredients with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 520,
      protein: 8,
      fat: 30,
      carbs: 54,
      sugar: 2,
    },
    storage:
      "Store in a cool, dry place away from direct sunlight. Individual items may have different shelf lives - please check each product for specific storage instructions.",
    shelfLife:
      "Best consumed within 30-60 days of production depending on the item. Check individual packages for details.",
    weightOptions: [
      { value: "Standard", label: "Standard Box (1.2kg)", price: 899, originalPrice: 1099 },
      { value: "Large", label: "Large Box (2kg)", price: 1399, originalPrice: 1699 },
      { value: "Party", label: "Party Size (3kg)", price: 1999, originalPrice: 2499 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Prakash Joshi",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Family Snack Box is perfect! Great variety of snacks that everyone in the family enjoys. Everything is fresh and crispy. The box lasts us about two weeks of regular snacking.",
        verified: true,
      },
      {
        id: 2,
        name: "Rekha Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment:
          "Excellent value for money! The variety is great and all the snacks are delicious. My kids especially love the Aloo Bhujia and Chakli. Will definitely order again when we run out.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 17,
        name: "Family Snacks Box",
        price: 1499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 78,
      },
      {
        id: 18,
        name: "Diwali Special Combo",
        price: 1999,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 65,
      },
      {
        id: 3,
        name: "Aloo Bhujia",
        price: 149,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 56,
      },
    ],
  },
  "20": {
    id: 20,
    name: "Festive Gift Box",
    description:
      "Our Premium Gift Basket is the ultimate luxury gift for special occasions. This exquisite collection features our finest sweets and snacks, including premium dry fruit-based items, all presented in a handcrafted wicker basket. Perfect for weddings, corporate gifting, or to impress someone special.",
    shortDescription: "Luxury gift basket with premium sweets and snacks in a handcrafted wicker basket.",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 5.0,
    reviews: 42,
    isNew: true,
    isBestseller: false,
    category: "Special Combo",
    tags: ["Premium", "Gift Basket", "Luxury", "Special Occasion"],
    ingredients:
      "This basket contains: Kaju Katli (300g), Badam Pista Roll (300g), Kesar Peda (300g), Dry Fruit Chikki (200g), Dry Fruit Mixture (200g), Masala Mathri (200g), and a complimentary box of premium dates. All items are made with 100% natural ingredients with no preservatives or artificial flavors added.",
    nutritionalInfo: {
      calories: 560,
      protein: 12,
      fat: 34,
      carbs: 56,
      sugar: 38,
    },
    storage:
      "Store in a cool, dry place away from direct sunlight. Individual items may have different shelf lives - please check each product for specific storage instructions.",
    shelfLife:
      "Best consumed within 15-30 days of production depending on the item. Check individual packages for details.",
    weightOptions: [
      { value: "Standard", label: "Standard Basket (1.5kg)", price: 2499, originalPrice: 2999 },
      { value: "Deluxe", label: "Deluxe Basket (2.5kg)", price: 3999, originalPrice: 4799 },
      { value: "Royal", label: "Royal Basket (4kg)", price: 5999, originalPrice: 7299 },
    ],
    productReviews: [
      {
        id: 1,
        name: "Rajat Kapoor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This Premium Gift Basket is truly exceptional! Sent it as a wedding gift and the recipients were absolutely delighted. The presentation is stunning and the quality of everything inside is top-notch. Worth every penny!",
        verified: true,
      },
      {
        id: 2,
        name: "Priyanka Malhotra",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        comment:
          "Ordered this for corporate gifting and it made a fantastic impression! The wicker basket is beautiful and reusable, and the selection of sweets and snacks is perfect. The premium quality is evident in every item.",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: 17,
        name: "Family Snacks Box",
        price: 1499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 78,
      },
      {
        id: 18,
        name: "Diwali Special Combo",
        price: 1999,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 65,
      },
      {
        id: 11,
        name: "Gulab Jamun",
        price: 549,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 58,
      },
    ],
  },
}

// This would be a dynamic route that fetches product data based on the ID
export default async function ProductPage({ params }: { params: { id: string } }) {
  // Get the product data based on the ID
  const productData = productsData[params.id as keyof typeof productsData]

  // If product not found, show 404 page
  if (!productData) {
    notFound()
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="aspect-square bg-muted rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded-lg w-3/4"></div>
              <div className="h-4 bg-muted rounded-lg w-1/2"></div>
              <div className="h-6 bg-muted rounded-lg w-1/4 mt-6"></div>
              <div className="h-10 bg-muted rounded-lg w-full mt-6"></div>
              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="h-12 bg-muted rounded-lg"></div>
                <div className="h-12 bg-muted rounded-lg"></div>
                <div className="h-12 bg-muted rounded-lg"></div>
              </div>
              <div className="h-12 bg-muted rounded-lg w-full mt-6"></div>
            </div>
          </div>
        </div>
      }
    >
      <ProductDescription product={productData} />
    </Suspense>
  )
}

