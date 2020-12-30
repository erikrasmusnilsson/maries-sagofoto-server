import dotenv from 'dotenv';

const envSetup = () => {
    const path = `${__dirname}/../.env`;
    dotenv.config({ path });
};

export { envSetup };