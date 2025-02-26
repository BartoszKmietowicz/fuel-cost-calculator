import { motion } from "framer-motion";

const LoadingCar = () => {
    return (
        <div className="flex items-center justify-center h-40">
            <div className=" w-32">
                <motion.svg
                    viewBox="0 0 640 512"
                    fill="currentColor"
                    className="w-32 text-black"  // Zmieniono kolor samochodu na czarny
                    animate={{ x: [0, 50, 0] }}  // Ruch samochodu
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                >

                    <rect x="60" y="120" width="480" height="90" fill="black" />
                    <polygon points="150,60 450,60 500,120 100,120" fill="black" />
                    <rect x="180" y="75" width="90" height="45" fill="white" />
                    <rect x="330" y="75" width="90" height="45" fill="white" />
                    <circle cx="150" cy="225" r="30" fill="black" />
                    <circle cx="450" cy="225" r="30" fill="black" />
                </motion.svg>

            </div>
        </div>







        // // <div className="flex items-center justify-center h-40">
        // //   <div className="relative w-32">
        // //     {/* Samochód */}
        // //     <motion.div
        // //       className="absolute w-16"
        // //       animate={{ x: [0, 50, -50, 0] }}
        // //       transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        // //     >
        // //       <svg
        // //         viewBox="0 0 640 512"
        // //         fill="currentColor"
        // //         className="w-16 text-teal-700"
        // //       >
        // //         <path d="M144 144c0-26.5 21.5-48 48-48h163.6c20.9 0 39.9 13.4 46.9 33.4L448 192H144v-48zM128 384a32 32 0 1 0 64 0 32 32 0 1 0-64 0zm368 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0zM96 144v48H64c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h13.8c8.2-37.7 41.6-66 81.2-66s73 28.3 81.2 66H400c8.2-37.7 41.6-66 81.2-66s73 28.3 81.2 66H576c17.7 0 32-14.3 32-32v-32c0-8.8-7.2-16-16-16H512c-8.8 0-16-7.2-16-16V192c0-17.7-14.3-32-32-32H96z" />
        // //       </svg>
        //      </motion.div>

        //     <motion.div
        //       className="absolute w-8 left-0 bottom-0 text-gray-400 z-10" // Dodano z-10
        //       animate={{ opacity: [1, 0.5, 0], y: [0, -10, -20] }}
        //       transition={{ repeat: Infinity, duration: 1, ease: "easeOut" }}
        //     >
        // //       <svg viewBox="0 0 512 512" fill="currentColor" className="w-8">
        // //         <path d="M192 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm80 64a64 64 0 1 0-128 0 64 64 0 1 0 128 0zM64 160a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm176 64a96 96 0 1 0-192 0 96 96 0 1 0 192 0zm128-32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm16 32a64 64 0 1 0-128 0 64 64 0 1 0 128 0zm112-64a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-48 96a96 96 0 1 0-192 0 96 96 0 1 0 192 0z" />
        // //       </svg>
        // //     </motion.div>
        //   </div>
        // </div>

    );
};

export default LoadingCar;
