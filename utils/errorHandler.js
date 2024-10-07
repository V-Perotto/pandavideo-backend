module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(
      { message: 'Algo não saiu bem!', 
        error: err.message }
    );
  };
  