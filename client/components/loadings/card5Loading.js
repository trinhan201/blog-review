const Card5Loading = () => {
    return (
        <div className="w-full">
            <div className="animate-pulse">
                <div className="bg-slate-200 w-full h-[200px] md:h-[150px] lg:h-[200px]"></div>
                <div className="space-y-6 py-1">
                    <div className="h-6 bg-slate-200 w-[70px] mt-5 rounded-xl"></div>
                    <div className="space-y-3">
                        <div className="h-6 lg:h-8 bg-slate-200 rounded-xl"></div>
                        <div className="h-6 lg:h-8 bg-slate-200 w-[70px] rounded-xl"></div>
                        <div className="h-4 bg-slate-200 w-[200px] rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card5Loading;
