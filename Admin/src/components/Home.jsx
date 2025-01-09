import Logo from '../assets/Logo2.jpg'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center absolute md:top-[20%] text-white md:left-[30%] gap-7 text-center">
        <img src={Logo} width={200} alt="" />
        <p className="ma:text-[40px] text-[35px] font-bold">Welcome, Emmyboi</p>
        <p className="ma:text-[30px] text-[26px] font-medium">Ready to manage your products? Let’s get started.</p>
    </div>
  )
}

export default Home