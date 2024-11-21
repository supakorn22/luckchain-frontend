import Button from '@components/default/Button';
import Text from '@components/default/Text';
import { ETextType } from '@components/default/Text/Text.enum';
import { FaStar } from 'react-icons/fa';
import { EColor, ESize } from 'theme/theme.enum';
import WalletButton from '../WalletButton';
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";

const Navbar = () => {
	return (
		<nav className='relative fixed left-0 top-0 flex justify-end w-full p-3 sm:justify-between md:p-4  z-99 bg-[#0044ff]'>
			<Link href='/'>
			<Text type={ETextType.h1} size={ESize.s} className='hidden sm:inline-block text-[#fff]'>
				LuckChain
			</Text>
			</Link>

			<div>
			
			<TopMenuItem
                title={"My lotterys"}
            	pageRef={"/mylotterys"}
            />
			<TopMenuItem
                title={"Buy"}
            	pageRef={"/buylottopage"}
            />
			<TopMenuItem
                title={"sell"}
            	pageRef={"/tiedlottopage"}
            />
			<TopMenuItem
                title={"admin"}
            	pageRef={"/admin"}
            />
			


				<WalletButton />
			</div>
		</nav>
	);
};

export { Navbar };
