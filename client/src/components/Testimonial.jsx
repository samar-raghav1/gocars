import { assets } from "../assets/assets";
import Title from "./Title";
const Testimonial = () => {
    const testimonials = [
        { location:"Barcelona,Spain", name: "Emma Rodriguez", image: assets.testimonial_image_1, testimonial: "I've rented cars from various companies, but the experiencewith goCars  was exceptional"},
        { location:"New York, USA", name: "Liam Johnson",image: assets.testimonial_image_2, testimonial:"goCars made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"},
        { location:"Seoul, South Korea", name: "Sophia Lee",image: assets.testimonial_image_2, testimonial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results."  }
    ];

    return (
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
           <Title title="What our Customer Say" sunTitle="Discover why discerning
           travelers choose StayVenture for their luxury accommodations around
           the world." />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-8 mt-18">
                {testimonials.map((testimonial,index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img src={assets.star_icon} alt="" key={index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonial;