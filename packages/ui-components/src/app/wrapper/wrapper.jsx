const Wrapper = ({children, ...props}) => {
  return <div className={`wrapper ${props.classNames}`}>{children}</div>
}

export default Wrapper;