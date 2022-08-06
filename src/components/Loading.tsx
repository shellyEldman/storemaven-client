import Instructions from './Instructions';

const Loading = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <Instructions />
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status" />
                <span className='ms-2'>Loading game...</span>
            </div>
        </div>
    );
}

export default Loading;