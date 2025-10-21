import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Package,
  Filter,
  Search,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  Heart,
  ShoppingCart,
  Eye
} from "lucide-react"

export default function ProductsPage() {
  const sampleProducts = [
    {
      id: 1,
      name: "Premium Skin Care Serum",
      price: "$29.99",
      originalPrice: "$49.99",
      discount: "40% OFF",
      category: "Beauty & Cosmetics",
      rating: 4.8,
      reviews: 1247,
      sales: "12.5K",
      shop: "Saladcode Beauty",
      country: "ES",
      trending: true,
      lastSeen: "2 hours ago",
      adSpend: "$2.3K",
    },
    {
      id: 2,
      name: "Wooden Puzzle Cube Set",
      price: "₹99",
      originalPrice: "₹299",
      discount: "67% OFF",
      category: "Games & Toys",
      rating: 4.6,
      reviews: 856,
      sales: "8.2K",
      shop: "PepPlay Games",
      country: "IN",
      trending: false,
      lastSeen: "1 hour ago",
      adSpend: "$890",
    },
    {
      id: 3,
      name: "Summer Fashion Dress",
      price: "€39.99",
      originalPrice: "€79.99",
      discount: "50% OFF",
      category: "Fashion & Apparel",
      rating: 4.9,
      reviews: 2156,
      sales: "18.7K",
      shop: "Taaima Fashion",
      country: "IT",
      trending: true,
      lastSeen: "30 minutes ago",
      adSpend: "$4.1K",
    },
    {
      id: 4,
      name: "Waterproof Phone Case",
      price: "$19.99",
      originalPrice: "$39.99",
      discount: "50% OFF",
      category: "Electronics",
      rating: 4.7,
      reviews: 934,
      sales: "6.8K",
      shop: "HydroShield Pro",
      country: "US",
      trending: false,
      lastSeen: "4 hours ago",
      adSpend: "$1.5K",
    },
    {
      id: 5,
      name: "Organic Coffee Blend",
      price: "$24.99",
      originalPrice: "$34.99",
      discount: "29% OFF",
      category: "Food & Beverage",
      rating: 4.9,
      reviews: 1678,
      sales: "9.3K",
      shop: "Kitty Town Coffee",
      country: "US",
      trending: true,
      lastSeen: "1 hour ago",
      adSpend: "$2.8K",
    },
    {
      id: 6,
      name: "Premium Cat Litter",
      price: "€15.99",
      originalPrice: "€25.99",
      discount: "38% OFF",
      category: "Pet Supplies",
      rating: 4.8,
      reviews: 2834,
      sales: "25.6K",
      shop: "MajeCats",
      country: "DE",
      trending: true,
      lastSeen: "15 minutes ago",
      adSpend: "$5.2K",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover trending products and analyze their performance across different platforms.
          </p>
        </div>
        <Button className="gap-2">
          <Package className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.7M</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Products</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234K</div>
            <p className="text-xs text-muted-foreground">
              +22% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.99</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              Average rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">Category</Button>
          <Button variant="outline">Price Range</Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          "All Categories",
          "Beauty & Cosmetics",
          "Fashion & Apparel", 
          "Electronics",
          "Home & Garden",
          "Pet Supplies",
          "Food & Beverage",
          "Games & Toys"
        ].map((category) => (
          <Button 
            key={category} 
            variant={category === "All Categories" ? "default" : "outline"} 
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map((product) => (
          <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {product.country}
                      </Badge>
                      {product.trending && (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {product.discount}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  {product.category}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{product.sales}</div>
                    <div className="text-xs text-muted-foreground">Sales</div>
                  </div>
                  <div>
                    <div className="font-medium">{product.adSpend}</div>
                    <div className="text-xs text-muted-foreground">Ad Spend</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  From: {product.shop}
                </div>

                <div className="text-xs text-muted-foreground">
                  Last seen: {product.lastSeen}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" className="flex-1 gap-2">
                    <ShoppingCart className="h-3 w-3" />
                    View Product
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-3 w-3" />
                    Ads
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
