if (process.env.NODE_ENV === 'production') {
    module.exports = 'https://localhost:5000';
} else {
    module.exports = `http://192.168.219.88:5000`;
    // module.exports = `http://49.165.17.150:5000`
}