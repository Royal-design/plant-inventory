import Image from 'next/image'
import { Leaf, Heart, Droplets, Sun } from 'lucide-react'

export default async function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-12 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-slate-800">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://media.istockphoto.com/id/1540197191/photo/small-tree-growing-with-sunshine-in-garden-eco-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=JhbROTGYFmh9ta0tdGToFp-nPiLoU0yH8Ax5YsU_QpE="
              alt="Beautiful indoor plants collection"
              className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1000}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50"></div>
          </div>
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 animate-bounce rounded-full bg-white p-4 shadow-lg dark:bg-gray-800">
            <Heart className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-pulse rounded-full bg-white p-4 shadow-lg dark:bg-gray-800">
            <Leaf className="h-6 w-6 text-green-500 dark:text-green-400" />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          <div>
            <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 lg:text-6xl dark:text-white">
              Bring Nature
              <span className="block text-green-600 dark:text-green-400">Into Your Home</span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Transform your living space into a green oasis with our carefully curated collection
              of indoor plants. From low-maintenance succulents to statement monstera deliciosas, we
              have the perfect plants to match your lifestyle and brighten your home.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start space-x-3">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                <Sun className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Expert Care Tips</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get personalized care guides for every plant
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Watering Reminders</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Never forget to water your plants again
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-lg dark:bg-green-500 dark:hover:bg-green-600">
              Shop Plants Now
            </button>
            <button className="rounded-xl border-2 border-green-600 px-8 py-4 text-lg font-semibold text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-white">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Plant Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Survival Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Section */}
      <div className="mt-20 rounded-3xl border bg-white p-12 shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose PlantLife?
          </h2>
          <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
            We&apos;re more than just a plant store. We&apos;re your partners in creating a
            healthier, more beautiful living environment. Our plants are carefully sourced, our care
            guides are expert-approved, and our community is here to support your plant parent
            journey.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hand-picked, healthy plants from certified nurseries
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Expert Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                24/7 plant care support from our horticulture experts
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Sun className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Safe, fast shipping with plant-friendly packaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
