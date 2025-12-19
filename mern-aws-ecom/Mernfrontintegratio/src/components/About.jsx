import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { label: "Happy customers", value: "120K+" },
    { label: "Products delivered", value: "3.2M" },
    { label: "Cities served", value: "220" },
    { label: "Avg. delivery time", value: "2.1 days" }
  ];

  const pillars = [
    {
      title: "Customer-first",
      desc: "Every feature, policy, and partnership is designed to keep shopping effortless and fair.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682 4.318 12.682a4.5 4.5 0 010-6.364z" />
        </svg>
      )
    },
    {
      title: "Reliable logistics",
      desc: "We partner with top carriers and maintain regional hubs to keep deliveries predictable.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2h6v2a2 2 0 004 0V7a2 2 0 00-2-2h-3l-1-1h-4l-1 1H6a2 2 0 00-2 2v10a2 2 0 104 0z" />
        </svg>
      )
    },
    {
      title: "Quality assurance",
      desc: "Curated catalogs, verified sellers, and proactive monitoring keep standards high.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Responsible commerce",
      desc: "We prioritize ethical sourcing, transparent pricing, and greener packaging choices.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3 0 2 3 5 3 5s3-3 3-5c0-1.657-1.343-3-3-3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.172 7.172A4 4 0 119 10.828m6-3.656a4 4 0 115.656 5.656L12 21l-8.656-8.172a4 4 0 015.656-5.656L12 7.5l1.344-1.328z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm font-semibold border border-white/20">
              Built for modern shopping
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              The story behind <span className="text-orange-400">ShopSphere</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
              We set out to make online shopping feel human: curated catalogs, fair pricing, and dependable service from cart to doorstep.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/products" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors">Explore products</Link>
              <Link to="/signup" className="px-6 py-3 border border-white/30 hover:border-white/50 rounded-lg font-semibold text-white/90 transition-colors">Join the community</Link>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white/5 backdrop-blur rounded-2xl border border-white/10 shadow-2xl p-6 grid sm:grid-cols-2 gap-4 lg:self-stretch">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-sm h-full flex flex-col justify-between">
                <p className="text-sm text-gray-200 mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-orange-300">{stat.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2 p-4 rounded-xl bg-orange-500 text-white flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide opacity-90">Promise</p>
                <p className="text-lg font-semibold">Fast, fair, and friendly</p>
              </div>
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-sm font-semibold text-orange-500">Our journey</p>
            <h2 className="text-3xl font-bold text-gray-900">From a small catalog to a trusted marketplace</h2>
            <p className="text-gray-600 leading-relaxed">
              ShopSphere started with a handful of passionate makers and a focus on dependable deliveries. Today, we connect customers to thousands of verified sellers, keeping the experience curated, transparent, and fair.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We obsess over the details: how packages are wrapped, how issues are resolved, and how quickly you get updates. It is the mix of tech, logistics, and a people-first culture that keeps us improving every week.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                <p className="text-sm text-gray-600">Average satisfaction</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">15k</p>
                <p className="text-sm text-gray-600">Monthly support chats resolved</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 grid gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full">
              <img
                src="https://www.capermint.com/wp-content/uploads/2024/07/ai-know-1024x640.webp"
                alt="Team collaborating"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100 h-full flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">People-powered</h3>
                <p className="text-gray-700 leading-relaxed">Our support crew and ops specialists work side-by-side with the product team to fix issues fast.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900 text-white h-full flex flex-col justify-between">
                <h3 className="text-lg font-semibold mb-2">Always learning</h3>
                <p className="text-gray-200 leading-relaxed">Weekly retros help us tune delivery routes, update policies, and polish the browsing experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 lg:py-20 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-semibold text-orange-500">What drives us</p>
              <h2 className="text-3xl font-bold text-gray-900">Principles we ship with</h2>
              <p className="text-gray-600 max-w-2xl mt-3">Every release, partnership, and policy is filtered through these principles so the experience stays consistent and trustworthy.</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
              Browse products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pillars.map((item) => (
              <div key={item.title} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl px-8 lg:px-12 py-12 lg:py-14 text-white shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%)]" />
            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold">Ready to see what is next?</h3>
                <p className="text-orange-50/90 text-lg leading-relaxed">Discover new launches every week, curated collections, and faster delivery windows tailored to your location.</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/products" className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:-translate-y-0.5 transition-transform">Start shopping</Link>
                  <Link to="/signup" className="px-6 py-3 border border-white/70 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">Create account</Link>
                </div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3">What you can expect</h4>
                <ul className="space-y-2 text-orange-50/90">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Curated, trusted sellers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Real-time delivery updates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Helpful support when you need it
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Easy returns with clear policies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
