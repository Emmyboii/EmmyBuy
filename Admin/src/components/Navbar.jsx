import BrandLogo from '../assets/Logo3.jpg';
import navprofile from '../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='p-5 bg-black flex justify-between'>
        <img src={BrandLogo} width={200} alt="" />
        <img src={navprofile} alt="" className='nav-profile'/>
        </div>
  )
}

export default Navbar