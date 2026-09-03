const Normal = ({ children, ...props }) => {
  return (
    <p className={`me-text ${props.classNames ? props.classNames : ''}`}>
      {children}
    </p>
  );
};

const Preahvihear = ({ children, ...props }) => {
  return (
    <p
      className={`me-text font-preahvihear${
        props.classNames ? props.classNames : ''
      }`}>
      {children}
    </p>
  );
};

const Text = ({ children, font, ...props }) => {
  let component;
  switch (font) {
    case 'Preahvihear':
      component = (
        <Preahvihear
          className={`me-text ${props.classNames ? props.classNames : ''}`}>
          {children}
        </Preahvihear>
      );
      break;

    default:
      component = (
        <Normal
          className={`me-text ${props.classNames ? props.classNames : ''}`}>
          {children}
        </Normal>
      );
      break;
  }
  return component;
};

export default Text;

