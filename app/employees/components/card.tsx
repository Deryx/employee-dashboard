type CardProps = {
    title: string;
    info: string | undefined;
}

const Card = ({ title, info }: CardProps) => {
    return (
        <section
            className=" border-gray-300 border-[0.5px] rounded-[10px] px-[8px] py-[5px] w-[160px] h-[100px] bg-white"
        >
            <h3
                className="text-[1rem] bg-white"
            >
                {title}
            </h3>
            <p
                className="text-[1rem] font-bold"
            >
                {info}
            </p>
        </section>
    );
};

export default Card;