interface ButtonProps {
    naam: string,
    handleClick?: ()  => void
}
const Button = (prop : ButtonProps) => {
  return (
    <>
      <button onClick={prop.handleClick}
        className="border-2 border-black w-[7rem] h-[2.5rem] bg-black text-white rounded-md shadow-md hover:bg-white hover:text-black transition ease-in-out duration-300 font-protest"
        type="submit"
      >
        {prop.naam}
      </button>
    </>
  );
}

export default Button