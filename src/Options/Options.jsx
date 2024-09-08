export const Options = ({ children, updateRate, variant }) => {
  return (
    <>
      <button onClick={() => updateRate(variant)}>{children}</button>
    </>
  );
};
