type CardProps = {
    title: string;
    info: string | undefined;
}

const Card = ({ title, info }: CardProps) => {
    return (
        <section
            className=" border-gray-300 border-[0.5px] rounded-[3px] px-[8px] py-[5px] w-[80px] bg-white"
        >
            <h3
                className="text-[0.4375rem] bg-white"
            >
                {title}
            </h3>
            <p
                className="text-[0.75rem] font-bold"
            >
                {info}
            </p>
        </section>
    );
};

export default Card;