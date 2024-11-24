

## สำคัญ
โปรดใช้ BNB Testnet เนื่องจาก RandomSubscriber ถูก deploy ไว้บน BNB Testnet ดังนั้นการทดสอบและทำงานกับระบบนี้ควรทำใน BNB Testnet เท่านั้น


#### ระบบของเราประกอบไปด้วย 5 contract หลัก ที่ใช้ในการจัดการลอตเตอรี่และรางวัลต่างๆ ดังนี้:

### 1. **RandomSubscriber**
   - ใช้เรียกค่าสุ่มจาก Chainlink สำหรับการออกผลลอตเตอรี่

### 2. **LotteryRegistry (Storage Contract)**
   - เก็บข้อมูลลอตเตอรี่ทั้งหมดในระบบ

### 3. **GovernmentLottery**
   - ล็อตเตอรี่ที่ออกโดยรัฐบาลหรือระบบ

### 4. **ExactMatchDealerLottery**
   - ล็อตเตอรี่ที่ออกโดยรายย่อย โดยเลขที่ออกต้องตรงกับเลขของ **GovernmentLottery** ทุกหลัก

### 5. **CustomDigitsDealerLottery**
   - ล็อตเตอรี่ที่ออกโดยรายย่อย โดยสามารถเลือกเลขจากหลักของ **GovernmentLottery** เช่น เลือกสองหลักท้าย

---

### **สถานะของแต่ละ Lottery Contract**
ในแต่ละ contract จะมีสถานะการทำงาน 5 ประการดังนี้:

1. **NOT_STARTED** – ยังไม่เริ่มการขาย
2. **ACTIVE** – เริ่มการขายแล้ว
3. **ENDED** – จบการขายแล้ว
4. **PRIZE_PAID** – รางวัลได้รับการจ่าย
5. **ARCHIVED** – จบการทำงาน

---

### **รายละเอียดการทำงานของแต่ละ Contract**

#### **GovernmentLottery**
- **NOT_STARTED**:
  - ยังไม่เริ่มการขาย
  - กด "start" เพื่อเริ่มการขาย
- **ACTIVE**:
  - เริ่มการขาย
  - กด "end" เพื่อจบการขาย
- **ENDED**:
  - จบการขาย
  - Contract จะเรียกเลขสุ่มจาก **RandomSubscriber**
  - จะปรากฏเลขสุ่มในสถานะถัดไป
  - กด "payprize" เพื่อจ่ายรางวัล
- **PRIZE_PAID**:
  - จ่ายรางวัลให้ผู้ที่ถูกรางวัล
  - ถ้าค่ารางวัลรวมค่าแก๊สแล้วไม่พอ จะมีการบิดตามคอนเซ็ปของชื่อกลุ่ม
  - เงินที่เหลือส่งคืนเจ้าของ
  - กด "archive" เพื่อจบการทำงาน
- **ARCHIVED**:
  - จบการทำงานแล้ว
  - ถ้ามีเงินค้างอยู่ใน contract โปรดกด "withdraw" (แต่ไม่ได้ใส่ไว้ในเว็บ) ซึ่งอาจเกิดจากการจ่ายภาษีของรายย่อย

#### **DealerLottery**
- **ExactMatchDealerLottery** และ **CustomDigitsDealerLottery** เป็นลอตเตอรี่ที่ออกโดยรายย่อย โดยผูกกับ **GovernmentLottery** (หนึ่ง **GovernmentLottery** สามารถมีได้หลายรายย่อย)
- การจ่ายรางวัล: 7% จะถูกหักให้กับ **GovernmentLottery**
- การขาย: สามารถซื้อลอตเตอรี่ได้จนกว่า **GovernmentLottery** ที่ผูกอยู่จะจบการขาย
- **NOT_STARTED**:
  - ยังไม่เริ่มการขาย
  - กด "start" เพื่อเริ่มการขาย
- **ACTIVE**:
  - เริ่มการขายแล้ว
  - กด "end" เพื่อจบการขาย (ต้องให้ **GovernmentLottery** ที่ผูกอยู่จบการขายก่อน)
- **ENDED**:
  - จบการขายแล้ว
  - Contract จะเรียกเลขที่ออกจาก **GovernmentLottery**
  - เลขที่ออกจะยึดตามเลขของ **GovernmentLottery**
  - กด "payprize" เพื่อจ่ายรางวัล
- **PRIZE_PAID**:
  - จ่ายรางวัลให้ผู้ถูกรางวัล
  - ถ้าค่ารางวัลรวมค่าแก๊สไม่พอ จะบิดตามคอนเซ็ปของชื่อกลุ่ม
  - เงินที่เหลือหัก 7% แล้วส่งคืนเจ้าของ
  - กด "archive" เพื่อจบการทำงาน
- **ARCHIVED**:
  - จบการทำงานแล้ว

---

### **การอธิบายหน้าเว็บ**

- **ขออภัยในความไม่สะดวกที่ต้องต่อ wallet ทุกครั้ง**
- หากกดแล้วไม่แน่ใจว่าได้ทำงานถูกต้องหรือไม่ โปรดกด "refresh" เนื่องจากระบบเรา fetch ข้อมูลเยอะมาก

#### **AdminPage**
- จัดการ **GovernmentLottery** และ **LotteryRegistry**
- ถ้าต้องการใช้งาน **admin** โปรดกด "get stroage contract" เพื่อ deploy **stroage contract** และนำไปใส่ในไฟล์ `.env` โดยใช้ตัวแปร `NEXT_PUBLIC_LotteryRegistry_ADDRESS`
- สามารถขาย **GovernmentLottery** ได้ แต่ต้องให้ **GovernmentLottery** ล่าสุดมีสถานะเป็น **ARCHIVED**
- สามารถเปลี่ยนสถานะของลอตเตอรี่ล่าสุดได้

#### **Homepage**
- ใช้สำหรับซื้อขายลอตเตอรี่
- กด "buy" ในตารางเพื่อซื้อ หากไม่มีคำว่า "buy" แสดงว่าไม่สามารถขายได้

#### **Mylotterypage**
- แสดงใบลอตเตอรี่ทั้งหมดที่ผู้ใช้ซื้อ

#### **Selllotterypage**
- ใช้สำหรับขาย **DealerLottery**
- หากต้องการขายโปรดตั้งค่า **stroage contract** ที่หน้า Admin ก่อน เนื่องจาก **LotteryRegistry** ต้องการ **owner** เพื่อเพิ่มล็อตเตอรี่
- สามารถเปลี่ยนสถานะของแต่ละใบลอตเตอรี่ได้ในตาราง
- หากกดตัวเลข **digits lottery type** จะเป็น **CustomDigitsDealerLottery** หากไม่กดจะเป็น **ExactMatchDealerLottery**

# LuckChain Lottery 

Welcome to the LuckChain Lottery! This project is a decentralized application built on the Binance Smart Chain (BSC) Testnet using Next.js, Ether.js, and the Next.js Dapp framework.

## Table of Contents
- [LuckChain Lottery](#luckchain-lottery)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction
LuckChain is a blockchain-based lottery application where users can participate in lottery draws using BNB on the Binance Smart Chain Testnet. The application leverages smart contracts to ensure transparency and fairness in the lottery process.

## Features
- Participate in lottery draws using BNB
- Transparent and fair lottery draws
- Real-time updates on lottery status
- Secure and decentralized

## Technologies Used
- **Blockchain**: Binance Smart Chain (BSC) Testnet
- **Frontend**: Next.js
- **Blockchain Interaction**: Ether.js
- **Framework**: Next.js Dapp

## Installation
To get started with the LuckChain Lottery, follow these steps:

1. Clone the repository:
   
        
        git clone https://github.com/yourusername/luckchain-frontend.git
        cd luckchain-frontend
        cd front-end
        

4. Install dependencies:
   
        
        npm install
        

3. Create a `.env.local` file and add your environment variables:

        
        NEXT_PUBLIC_LotteryRegistry_ADDRESS = 0x25ce508Ed41f162C37AE84CbC51ca67ed535e8e4
        NEXT_PUBLIC_RandomSubscriber_ADDRESS = 0x722d2B77039052d3f314AcF01C144B3078135A83

        

5. Run the development server:
   
        
        npm run dev
        

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
1. Connect your wallet (e.g., MetaMask) to the Binance Smart Chain Testnet.
2. Enter the amount of BNB you want to use to participate in the lottery.
3. Confirm the transaction in your wallet.
4. Wait for the lottery draw and check if you are the lucky winner!

## Contributing
We welcome contributions to improve the LuckChain Lottery. Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
