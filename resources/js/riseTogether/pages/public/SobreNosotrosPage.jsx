// resources/js/riseTogether/pages/public/AboutPage.jsx
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

function ValorCard({ icon, title, text }) {
    return (
        <div className="p-8 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-[#f2780d]/50 transition-all group">
            <span className="material-symbols-outlined text-[#f2780d] mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </span>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );
}

function Step({ n, title, text }) {
    return (
        <div className="flex flex-col items-center text-center gap-6">
            <div className="size-16 rounded-full bg-[#f2780d] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-[#f2780d]/30">
                {n}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );
}

function TeamMember({ name, role, img }) {
    return (
        <div className="flex flex-col items-center text-center gap-4">
            <div
                className="size-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-cover bg-center"
                style={{ backgroundImage: `url('${img}')` }}
            />
            <div>
                <h4 className="font-bold">{name}</h4>
                <p className="text-sm text-[#f2780d]">{role}</p>
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <div className="bg-[#f9f8f6] dark:bg-[#120c07] text-[#1c140d] dark:text-gray-100 transition-colors duration-300 min-h-screen">
            {/* Header reutilizado */}
            <HeaderPublic />

            <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
                {/* HERO */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="flex flex-col gap-6">
                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#f2780d] bg-[#f2780d]/10 rounded-full w-fit">
                            Our Story
                        </span>

                        <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-[#1c140d] dark:text-white">
                            Empowering <span className="text-[#f2780d]">Dreams</span>, Together
                        </h1>

                        <p className="text-lg md:text-xl text-[#9c7049] dark:text-gray-400 leading-relaxed max-w-lg">
                            A modern crowdfunding platform built on transparency, innovation,
                            and the power of community. Join thousands of creators making an
                            impact.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="px-8 py-4 bg-[#f2780d] text-white font-bold rounded-xl text-lg hover:translate-y-[-2px] transition-all shadow-xl shadow-[#f2780d]/20">
                                Browse Campaigns
                            </button>
                            <button className="px-8 py-4 bg-[#f4ede7] dark:bg-gray-800 text-[#1c140d] dark:text-white font-bold rounded-xl text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                                Our Vision
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#f2780d]/20 rounded-xl blur-2xl group-hover:bg-[#f2780d]/30 transition-all" />
                        <div
                            className="relative h-[400px] w-full bg-cover bg-center rounded-xl shadow-2xl border-4 border-white dark:border-gray-800"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkLgXbLpfrHiwIVGjDc9O6bYOVk1oAnqdLyoieStMVXhxVfpj57IUS_9NfTb78kh9cNGj3_nRRQ_TYnJSdAFr_EXtjCPqjmQGI1scYaElczyILKxdEJXpbm5EiWhjaYOoGx2x30P_nbGYzIzvnfXBc9P9mHPdaUZDRoYVnNA-h4fhby-s56gVlzqBw6clq55B5JoCkqkWZ8ZPI7nhFRchpWSwBBU-rkGF6wGhWCNlPBEDnUwVSmsMN6hTcw9WqtAUUqwhsWkSt7Uc')",
                            }}
                        />
                    </div>
                </section>

                {/* MISSION */}
                <section className="mb-24">
                    <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-full md:w-1/3 aspect-square bg-[#f2780d]/5 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-[120px] text-[#f2780d]">
                                rocket_launch
                            </span>
                        </div>

                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                            <p className="text-xl text-[#9c7049] dark:text-gray-400 leading-relaxed">
                                RiseTogether was founded to bridge the gap between visionaries
                                and supporters. We believe that when people come together, the
                                impossible becomes achievable. Our goal is to democratize access
                                to capital for everyone, everywhere.
                            </p>
                            <p className="text-lg font-medium text-[#f2780d]">
                                Fostering a world where every great idea finds its foundation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* VALUES */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            The principles that guide every decision we make.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValorCard
                            icon="visibility"
                            title="Transparency"
                            text="Open communication and honest reporting at every step of the journey."
                        />
                        <ValorCard
                            icon="groups"
                            title="Community"
                            text="We believe in the collective power of people to drive global change."
                        />
                        <ValorCard
                            icon="lightbulb"
                            title="Innovation"
                            text="Constantly building better tools to help creators bring ideas to life."
                        />
                        <ValorCard
                            icon="public"
                            title="Inclusion"
                            text="Creating a platform where funding is accessible to everyone."
                        />
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="mb-24 py-16 bg-white/50 dark:bg-gray-900/30 rounded-xl px-8">
                    <h2 className="text-3xl font-bold text-center mb-16">How it Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <Step
                            n="1"
                            title="Create a Project"
                            text="Define your goals, set your target, and tell your unique story to the world."
                        />
                        <Step
                            n="2"
                            title="Share with Community"
                            text="Use our built-in tools to reach backers who believe in your vision."
                        />
                        <Step
                            n="3"
                            title="Reach Your Goal"
                            text="Collect funds, provide updates, and make your dream a reality."
                        />
                    </div>
                </section>

                {/* TEAM */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Meet Our Team
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <TeamMember
                            name="Sarah Chen"
                            role="Founder & CEO"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuBkAI1e6s7UuAJDdmJjkHCZ4mI6YV864rjEg71-gfoKqtYUN5j-CcPudyNPo_56IXAdDsO4TVk6WRSRGFQh20OgCa2DuKFakK-SArzfKXJREc5L5JWR3cUnV9Elk3sAde9JQO0KcLf4jsoTLxa8QDYlMOfz9tozeQlBxMS7vgOqoac5KdP0Ya4F2g0Az7bm9YceZYRYchrQ6-yGXazPoZQw8oAnm-7vzCEshjE6tEp1l9XwzaeaKOdMKVS1YvCdId_RjrQf-1hIMHs"
                        />
                        <TeamMember
                            name="Marcus Thorne"
                            role="Head of Growth"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuAeFaRcYl2BQWE56tOtTVJD3w_x1U_QZMcADPxZCdoG0GaT7f9UQw-5xg3agmzJWK290PE0tKVQOTh3Gz7ILh_wyOxG0TfnFiplR5o1p0u5_Pz0pwjKBesb9r85V_yeMe3Sfx2qB28zpCIhtoQlKnTHMVw0ggVRXVkXFEXcsOOBkt_cODHeBO1htHIFZYTj6iJ4ExbjGOmqIJx3NHX_Zx-c_KauhEg5cVF_bOvvFmAGDtsywNPVbxS3f8LQSpcFoOU-01sHn_lsed8"
                        />
                        <TeamMember
                            name="Elena Rodriguez"
                            role="Product Designer"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_g1rm5qTfyVa-PQQa0Bd69KyoP8i2JzLD8CRL_jEoXoJ-cLeg37XEI9dLHu2hRyGK79v0rWUM-Kl1ciXyXOg-E1mt-EaqvguKzs2G7BF4RtxeMQeA1ts9RrvjDrg0F1YbZXcs0qeYcGYkO5d4KoUwXsh7ccs09TZDFclHiMNGwF98rC5gKjVF8pXKZNaAbLjhTVSo4iadjswZD5CVyRtSlnRAqmAoxipwDMExhRU_aLvJKPmNsl8y6SuSxPJWQR5t61jiGUdQL8"
                        />
                        <TeamMember
                            name="David Kim"
                            role="CTO"
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuB-dNbP0nwSNnoAbG6BmTukr0GjyH8LCYTuSrlunH-DyO1JIDzYq3vH2x2VKqmm0N7sf9_nKg0d5mGy0qWaOtKm41-xgxSSKKe-0j2y2FfmEp0_h-6CRkM7OWZx34w13wg2cxUB5VUuRsMW9tK9XaotNZeoxC5tIi-csve-W7yiHLzto2Gum9L78qXA8AM4-K6oHHFu99mzBky6LdEYmKknMsPuWQCRYdFqwLWGbppGUl7tFX1a3QYXktb90MQcJ7dYJ4cumpRYjSE"
                        />
                    </div>
                </section>

                {/* CTA FINAL */}
                <section className="mb-12">
                    <div className="bg-[#f2780d]/10 dark:bg-[#f2780d]/5 rounded-xl p-12 text-center flex flex-col items-center gap-8 border border-[#f2780d]/20">
                        <h2 className="text-4xl font-black max-w-2xl">
                            Ready to make a difference in the world?
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-10 py-4 bg-[#f2780d] text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform">
                                Launch Your Project
                            </button>
                            <button className="px-10 py-4 bg-white dark:bg-gray-800 text-[#1c140d] dark:text-white font-bold rounded-xl text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-[#f2780d]/20">
                                Browse Campaigns
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer reutilizado */}
            <FooterPublic />
        </div>
    );
}