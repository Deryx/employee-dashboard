type CardProps = {
    title: string;
    info: string | undefined;
}

const Card = ({ title, info }: CardProps) => {
    return (
        <section
            className=" border-gray-200 border-[0.5px] rounded-[10px] px-5 py-5 w-[250px] h-[125px] bg-white"
        >
            <h3
                className="text-[0.9rem] text-gray-600 bg-white"
            >
                {title}
            </h3>
            <p
                className="text-[1.75rem] mt-4 font-bold"
            >
                {info}
            </p>
        </section>
    );
};

export default Card;