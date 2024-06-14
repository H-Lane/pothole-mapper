const handleReportPopulation = async (event) => {
  try {
      const response = await fetch(`/api/report`,{
          method: `GET`,
          headers: { "Content-Type": "application/json" } 
      })
   //   
      .then(res) 
} catch (err) {
    console.log(err);
  }
};
