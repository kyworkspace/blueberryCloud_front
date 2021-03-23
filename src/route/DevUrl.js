if (process.env.NODE_ENV === 'production') {
    module.exports = 'https://~~~';
} else {
    module.exports = `http://localhost:5000`;
}