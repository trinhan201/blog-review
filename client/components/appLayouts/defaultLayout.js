import Header from './header';
import Footer from './footer';

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-full w-full xl:w-[1180px] shadow-2xl">
            <div className="bg-white w-full select-none">
                <Header />
            </div>
            <div className="flex flex-col flex-1 items-center w-full">{children}</div>
            <div className="flex justify-center w-full bg-white">
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
