const handlePotholeReport = async (event) => {
    try {
        event.preventDefault();

        const response = await fetch(`/api/pothole`, {
            method: `POST`,
            body: ,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

handlePotholeReport();