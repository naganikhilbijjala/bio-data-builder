import Link from "next/link";
import { FileText, Users, Download, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-gray-800">BioCraft</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-500">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-500">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Create Professional Bio Data in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Generate beautiful, customized bio data PDFs for marriage proposals
            with ease
          </p>
          <Link
            href="/create-biodata"
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Create Your Bio Data
          </Link>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose BioCraft?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<FileText className="h-12 w-12 text-blue-500" />}
                title="Easy to Use"
                description="Simple form-filling process to create your bio data"
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-blue-500" />}
                title="Customizable Templates"
                description="Choose from a variety of professional designs"
              />
              <FeatureCard
                icon={<Download className="h-12 w-12 text-blue-500" />}
                title="Instant PDF Generation"
                description="Download your bio data immediately after submission"
              />
              <FeatureCard
                icon={<Shield className="h-12 w-12 text-blue-500" />}
                title="Privacy Focused"
                description="Your data is secure and never shared without permission"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                image="/placeholder.svg?height=100&width=100"
                name="Rahul S."
                quote="BioCraft made creating my bio data so easy. I received compliments on how professional it looked!"
              />
              <TestimonialCard
                image="/placeholder.svg?height=100&width=100"
                name="Priya M."
                quote="The templates are beautiful, and the PDF generation is instant. Highly recommended!"
              />
              <TestimonialCard
                image="/placeholder.svg?height=100&width=100"
                name="Amit K."
                quote="I love how I can update my bio data anytime. It's perfect for keeping my information current."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Create Your Professional Bio Data?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have successfully created their bio data
            with BioCraft
          </p>
          <Link
            href="/create-biodata"
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Get Started Now
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FileText className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">BioCraft</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface TestimonialCardProps {
  image: string;
  name: string;
  quote: string;
}

function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
      <p className="text-gray-600 italic">&quot;{quote}&quot;</p>
    </div>
  );
}
