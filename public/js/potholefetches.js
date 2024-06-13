const handlePotholeReport = async (event) => {
    try {
        event.preventDefault();

        console.log();
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

handlePotholeReport();