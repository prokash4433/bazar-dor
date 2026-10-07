import Image from 'next/image';
 

const Header = () => {
          return (
                    <div>
                         <div>
                            <Image className="w-10 h-10" height={50} width={50} src={'/logo-icon.png/'} alt=''/>  
                         </div>     
                    </div>
          );
};

export default Header;