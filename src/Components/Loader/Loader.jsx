import './Loader.css';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='loader'>
            <Oval
                height={100}
                width={100}
                color="rgb(105,126,166)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffffff"
                strokeWidth={5}
                strokeWidthSecondary={3}
            />
        </div>
    );
};

export default Loader;