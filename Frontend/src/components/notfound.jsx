const NotFound = () => {
    return (
        <>
            <div 
                className="d-flex flex-column justify-content-center align-items-center text-center" 
                style={{
                    height: "100vh", 
                    background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
                    color: "#000000ff"
                }}
            >
                <h1 className="display-3 fw-bold">404</h1>
                <h2>Page Not Found</h2>
                <p className="lead">The page you're looking for doesn’t exist.</p>
            </div>
        </>
    );
};

export default NotFound;
