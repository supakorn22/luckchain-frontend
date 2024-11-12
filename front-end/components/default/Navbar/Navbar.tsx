import Button from '@components/default/Button';
import Text from '@components/default/Text';
import { ETextType } from '@components/default/Text/Text.enum';
import { FaStar } from 'react-icons/fa';
import { EColor, ESize } from 'theme/theme.enum';
import WalletButton from '../WalletButton';

const repoUrl = 'https://github.com/swiiny/create-nextjs-dapp';

const Navbar = () => {
	return (
		<nav className='fixed left-0 top-0 flex justify-end w-full p-4 sm:justify-between md:p-8'>
			<Text type={ETextType.h1} size={ESize.s} className='hidden sm:inline-block'>
				LuckChain
			</Text>
			<div>

				<WalletButton />
			</div>
		</nav>
	);
};

export { Navbar };
