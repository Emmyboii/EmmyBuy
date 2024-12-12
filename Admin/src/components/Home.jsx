import Logo from '../assets/Logo2.jpg';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center absolute top-[20%] text-white left-[30%] gap-7 text-center">
        <img src={Logo} width={200} alt="" />
        <p className="text-[40px] font-bold">Welcome, Emmyboi</p>
        <p className="text-[30px] font-medium">Ready to manage your products? Let’s get started.</p>
    </div>
  )
}

export default Home