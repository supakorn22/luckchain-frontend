import { FC, useEffect, useState, Suspense, lazy } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    TextField
} from "@mui/material";
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import LotteryAdminTable from '@components/pages/_component/LotteryAdminTable';
import useBaseLottery from '@utils/BaseLottery/useBaseLottery';

// Define the Lottery Metadata interface
interface LotteryMetadata {
    id: string;
    status: "Available" | "Sold" | "Inactive" | "Pending";
    winingNumber: number | null;
    winnigPrize: number | null;
    owner: string;
}

const AdminPage: React.FC = () => {

    const [registerData, setRegisterData] = useState<GovernmentLotteryFullMetadata[]>([]);
    const lastLottery = registerData[0];
    const [winningPrize, setWinningPrize] = useState<number>(0);
    const [tickerPrice, setTickerPrice] = useState<number>(0);
    const [digits, setDigits] = useState<number>(6);
    const [maxSet, setMaxSet] = useState<number>(999999);
    const [randomContractAddress, setRandomContractAddress] = useState<string>('');
    const [buttonDisable, setButtonDisable] = useState<boolean>(false);
    const [storageContract, setStorageContract] = useState<string>('');

    useEffect(() => {
        useLotteryRegistry.getGovernmentData()
            .then((result) => {

                setRegisterData([...result].reverse());
            })

    }, []);

    const buttonDisable1: boolean = (lastLottery && lastLottery.status != 4) || winningPrize == 0 || tickerPrice == 0 || digits == 0 || maxSet == 0;



    // Handle selling a lottery
    const handleSellLottery = async () => {
        await useLotteryRegistry.addGovernmentLottery(winningPrize, tickerPrice, digits, maxSet, randomContractAddress)
        const data = await useLotteryRegistry.getGovernmentData()
        setRegisterData([...data].reverse());
    };

    const handleACTIVE = async () => {
        useBaseLottery.setContractAddress(lastLottery.contractAddress);
        await useBaseLottery.start();
        const data = await useLotteryRegistry.getGovernmentData()
        setRegisterData([...data].reverse());
    };

    const handleENDED = async () => {
        useBaseLottery.setContractAddress(lastLottery.contractAddress);
        await useBaseLottery.end();
        const data = await useLotteryRegistry.getGovernmentData()
        setRegisterData([...data].reverse());

    };

    const handlePRIZE_PAID = async () => {
        useBaseLottery.setContractAddress(lastLottery.contractAddress);
        await useBaseLottery.payPrize();
        const data = await useLotteryRegistry.getGovernmentData()
        setRegisterData([...data].reverse());

    };

    const handleARCHIVED = async () => {
        useBaseLottery.setContractAddress(lastLottery.contractAddress);
        await useBaseLottery.archive();
        const data = await useLotteryRegistry.getGovernmentData()
        setRegisterData([...data].reverse());
    }

    const HandleGetStorageContract = async () => {
        const storageContract = await useLotteryRegistry.deploy();
        setStorageContract(storageContract);
    }


    return (
        <Box sx={{ p: 4 }}>
            <Typography className="text-black" variant="h4" gutterBottom>
                Admin Page - Manage Lotteries
            </Typography>



            <Typography className="text-black" variant="h6">
                In this pages you are Admin. You can mange government lotteries and stroage contract.
                <br />
                First you need to set stroage contract if you want to be admin. You can set it at env file.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={HandleGetStorageContract}
                sx={{ mb: 3 }}

            >
                get stroage contract
            </Button>

            <Typography className="text-black" variant="h6">
                Ctroage contract addtess: {storageContract}
            </Typography>


            <Typography className="text-black" >
                <br />To sell lottery you need to ARCHIVED last lottery first(the top lottery of table). This is not contract requirement but it is a good practice for my frontend setup.
                <br /> The status of lottery can be NOT_STARTED -{">"} ACTIVE -{">"} ENDED -{">"} PRIZE_PAID -{">"} ARCHIVED
                <br /> Change lsat lottery status :
            </Typography>

            <Button variant="contained" color="primary" onClick={handleACTIVE} sx={{ mb: 3 }} disabled={!lastLottery || lastLottery.status != 0} >
                ACTIVE
            </Button>
            <Button variant="contained" color="primary" onClick={handleENDED} sx={{ mb: 3 }} disabled={!lastLottery || lastLottery.status != 1} >
                ENDED
            </Button>
            <Button variant="contained" color="primary" onClick={handlePRIZE_PAID} sx={{ mb: 3 }} disabled={!lastLottery || lastLottery.status != 2} >
                PRIZE_PAID
            </Button>
            <Button variant="contained" color="primary" onClick={handleARCHIVED} sx={{ mb: 3 }} disabled={!lastLottery || lastLottery.status != 3} >
                ARCHIVED
            </Button>
            <br />

            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Winning Prize"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={winningPrize}
                            onChange={(e) => setWinningPrize(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Ticket Price"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={tickerPrice}
                            onChange={(e) => setTickerPrice(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Digits"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={digits}
                            onChange={(e) => setDigits(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Max Set (max ticket that user can buy)"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={maxSet}
                            onChange={(e) => setMaxSet(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Random Contract Address (Optional)"
                            variant="outlined"
                            fullWidth
                            value={randomContractAddress}
                            onChange={(e) => setRandomContractAddress(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSellLottery}
                    sx={{ mb: 3 }}
                    disabled={buttonDisable || buttonDisable1}
                >
                    Sell Lottery
                </Button>
            </div>
            <Typography className="text-black" >
                Sell Lottery will add new lottery to the list. The status will be NOT_STARTED.
            </Typography>



            <LotteryAdminTable data={registerData} />

        </Box>
    );
};

export { AdminPage };
