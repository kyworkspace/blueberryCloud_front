if (process.env.NODE_ENV === 'production') {
    module.exports = 'https://~~~';
} else {
    module.exports = `http://192.168.219.88:5000`;
}