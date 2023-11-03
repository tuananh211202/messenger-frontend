import '../../Assets/Styles/fonts.css';

type LogoProps = {
  size: number;
  color: string;
  className?: string;
}

const SendNowLogo = ( props: LogoProps ) => {
  return (
    <div className={'w-fit ' + props.className}>
      <p style={{ fontSize: props.size, color: props.color, fontFamily: 'Edu TAS Beginner', fontWeight: 500 }}>SendNow</p>
    </div>
  );
}

export default SendNowLogo;
