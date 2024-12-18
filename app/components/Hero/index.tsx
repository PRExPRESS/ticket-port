import React from 'react'
import SearchBar from '../heroSearchBar/SearchBar'
import Button from '../CustomBotton'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <div>
            <section className="relative w-full h-[50vh] md:h-screen m-0">
                {/* Image */}
                <img src="/imgs/hero-bg.jpg" alt="hero" className="w-full h-full object-cover" />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/70 "></div>

                {/* Content */}
                <div className=" absolute top-1/4 left-0 w-full flex flex-col justify-start items-center md:h-full">
                    <h1 className="text-3xl md:text-5xl font-bold  mb-4 text-background-light w-8/12 text-center font-fira"> Discover and Secure Your Event Tickets Effortlessly</h1>
                    <p className="text-sm md:text-lg text-[#D1D5DB] mb-8 font-bold font-roboto text-center ">
                        Your gateway to exclusive events, with secure and streamlined ticketing
                    </p>
                    {/* Buttons row */}
                    <div className="hidden md:flex flex-row items-center justify-around w-4/12 container mt-[50px]">
                        <div className="flex flex-col w-5/12">
                            <Button
                                label="Get started" onClick={function (): void {
                                    throw new Error('Function not implemented.')
                                }}
                                className="bg-accent hover:bg-accent-hover text-primary h-[50px]"
                            />

                        </div>
                        <div className="flex flex-col w-5/12">
                            <Button
                                label="Sign up"
                                onClick={function (): void {
                                    throw new Error('Function not implemented.')
                                }}

                                
                                className="bg-none hover:bg-hoverEffects-gold hover:text-primary text-accent h-[50px] outline-accent border-2 border-accent"
                            />
                        </div>
                    </div>

                    {/* search bar */}
                    <div className="w-full md:w-5/12 md:mt-[50px] px-7 md:px-0">
                        <SearchBar onChange={() => { }} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection
